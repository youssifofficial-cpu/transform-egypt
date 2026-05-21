#!/usr/bin/env python3
"""
Bulk-download every video from a Telegram channel.

Works with PRIVATE channels too, as long as you are a member of them, because
the tool logs in with your own Telegram account (not a bot).

Usage:
    python tg_downloader.py

Settings are read from config.ini placed next to this script.
"""

import asyncio
import configparser
import json
import os
import re
import sys
from pathlib import Path

try:
    from telethon import TelegramClient
    from telethon.errors import FloodWaitError
    from telethon.tl.types import DocumentAttributeAnimated, DocumentAttributeFilename
except ImportError:
    sys.exit(
        "Telethon is not installed.\n"
        "Run setup.bat (Windows), or:  pip install -r requirements.txt"
    )

try:
    from tqdm import tqdm
except ImportError:
    sys.exit(
        "tqdm is not installed.\n"
        "Run setup.bat (Windows), or:  pip install -r requirements.txt"
    )

SCRIPT_DIR = Path(__file__).resolve().parent
CONFIG_PATH = SCRIPT_DIR / "config.ini"
SESSION_PATH = SCRIPT_DIR / "tg_session"
MANIFEST_NAME = ".download_manifest.json"

EXT_BY_MIME = {
    "video/mp4": ".mp4",
    "video/quicktime": ".mov",
    "video/x-matroska": ".mkv",
    "video/webm": ".webm",
    "video/x-msvideo": ".avi",
    "video/mpeg": ".mpg",
    "video/x-flv": ".flv",
    "video/3gpp": ".3gp",
}


class Config:
    def __init__(self, api_id, api_hash, channel, download_dir, min_id, max_id):
        self.api_id = api_id
        self.api_hash = api_hash
        self.channel = channel
        self.download_dir = download_dir
        self.min_id = min_id
        self.max_id = max_id


def load_config():
    if not CONFIG_PATH.exists():
        sys.exit(
            f"Config file not found: {CONFIG_PATH}\n"
            "Copy config.example.ini to config.ini and fill it in."
        )
    parser = configparser.ConfigParser()
    parser.read(CONFIG_PATH, encoding="utf-8")
    if not parser.has_section("telegram"):
        sys.exit("config.ini is missing the [telegram] section.")
    sec = parser["telegram"]

    api_id = sec.get("api_id", "").strip()
    api_hash = sec.get("api_hash", "").strip()
    if not api_id or not api_hash:
        sys.exit(
            "api_id / api_hash are not set in config.ini.\n"
            "Get them from https://my.telegram.org -> 'API development tools'."
        )
    try:
        api_id = int(api_id)
    except ValueError:
        sys.exit("api_id in config.ini must be a number.")

    download_dir = sec.get("download_dir", "downloads").strip() or "downloads"
    dl_path = Path(download_dir)
    if not dl_path.is_absolute():
        dl_path = SCRIPT_DIR / dl_path

    def as_int(key):
        raw = (sec.get(key, "0") or "0").strip() or "0"
        try:
            return int(raw)
        except ValueError:
            return 0

    return Config(
        api_id=api_id,
        api_hash=api_hash,
        channel=sec.get("channel", "").strip(),
        download_dir=dl_path,
        min_id=as_int("min_id"),
        max_id=as_int("max_id"),
    )


def sanitize(name):
    """Make a string safe to use as a Windows filename."""
    name = re.sub(r'[<>:"/\\|?*\x00-\x1f]', "_", name)
    name = name.strip().strip(".")
    return name[:120]


def get_video_document(message):
    """Return the video document attached to a message, or None.

    Animated GIFs are intentionally skipped (they are not real videos).
    """
    if message is None or message.media is None:
        return None
    doc = getattr(message, "document", None)
    if doc is None:
        return None
    attrs = getattr(doc, "attributes", []) or []
    if any(isinstance(a, DocumentAttributeAnimated) for a in attrs):
        return None
    if message.video:
        return doc
    mime = getattr(doc, "mime_type", "") or ""
    if mime.startswith("video/"):
        return doc
    return None


def target_filename(message, doc):
    original = None
    for attr in getattr(doc, "attributes", []) or []:
        if isinstance(attr, DocumentAttributeFilename):
            original = attr.file_name
            break
    if original:
        stem, ext = os.path.splitext(original)
    else:
        stem, ext = "", ""
    if not ext:
        ext = EXT_BY_MIME.get(getattr(doc, "mime_type", "") or "", ".mp4")
    stem = sanitize(stem) if stem else "video"
    # Zero-padded message id keeps files sorted in chronological order.
    return f"{message.id:08d} - {stem}{ext}"


def load_manifest(folder):
    path = folder / MANIFEST_NAME
    if path.exists():
        try:
            return json.loads(path.read_text(encoding="utf-8"))
        except Exception:
            return {}
    return {}


def save_manifest(folder, manifest):
    try:
        (folder / MANIFEST_NAME).write_text(
            json.dumps(manifest, indent=2), encoding="utf-8"
        )
    except Exception:
        pass


async def pick_channel(client):
    print("Loading your chats...")
    dialogs = await client.get_dialogs()
    chats = [d for d in dialogs if d.is_channel or d.is_group]
    if not chats:
        sys.exit("No channels or groups found on this account.")
    print("\nSelect the channel to download from:\n")
    for i, d in enumerate(chats, 1):
        kind = "channel" if d.is_channel else "group"
        print(f"  [{i:>3}] {d.name}  ({kind})")
    while True:
        choice = input("\nEnter the number: ").strip()
        if choice.isdigit() and 1 <= int(choice) <= len(chats):
            return chats[int(choice) - 1].entity
        print("Invalid choice, try again.")


async def resolve_channel(client, channel):
    if not channel:
        return await pick_channel(client)
    ident = int(channel) if re.fullmatch(r"-?\d+", channel) else channel
    try:
        return await client.get_entity(ident)
    except Exception as exc:
        print(f"Could not resolve channel '{channel}': {exc}")
        print("Falling back to the channel picker.\n")
        return await pick_channel(client)


async def download_one(client, message, dest, size):
    tmp = dest.with_name(dest.name + ".part")
    if tmp.exists():
        tmp.unlink()
    bar = tqdm(
        total=size or None,
        unit="B",
        unit_scale=True,
        unit_divisor=1024,
        desc=dest.name[:38],
        leave=False,
    )

    def progress(received, _total):
        bar.update(received - bar.n)

    attempt = 0
    try:
        while True:
            try:
                await client.download_media(
                    message, file=str(tmp), progress_callback=progress
                )
                break
            except FloodWaitError as fw:
                attempt += 1
                if attempt > 5:
                    raise
                wait = fw.seconds + 5
                bar.write(f"  Rate-limited by Telegram; waiting {wait}s...")
                await asyncio.sleep(wait)
                bar.reset()
    finally:
        bar.close()
    tmp.replace(dest)


async def run():
    cfg = load_config()
    cfg.download_dir.mkdir(parents=True, exist_ok=True)

    client = TelegramClient(str(SESSION_PATH), cfg.api_id, cfg.api_hash)
    print("Connecting to Telegram...")
    await client.start()  # prompts for phone / login code on first run only
    me = await client.get_me()
    uname = f" (@{me.username})" if me.username else ""
    print(f"Logged in as {me.first_name}{uname}\n")

    try:
        entity = await resolve_channel(client, cfg.channel)
        title = getattr(entity, "title", None) or getattr(entity, "first_name", "chat")
        print(f"\nChannel:  {title}")
        print(f"Saving to: {cfg.download_dir}\n")

        manifest = load_manifest(cfg.download_dir)

        kwargs = {"reverse": True}  # oldest -> newest
        if cfg.min_id > 0:
            kwargs["min_id"] = cfg.min_id
        if cfg.max_id > 0:
            kwargs["max_id"] = cfg.max_id

        found = downloaded = skipped = failed = 0
        bytes_total = 0
        failures = []

        print("Scanning messages for videos (this can take a while)...\n")
        async for message in client.iter_messages(entity, **kwargs):
            doc = get_video_document(message)
            if doc is None:
                continue
            found += 1
            fname = target_filename(message, doc)
            dest = cfg.download_dir / fname
            size = getattr(doc, "size", 0) or 0

            if dest.exists() and size > 0 and dest.stat().st_size == size:
                skipped += 1
                manifest[str(message.id)] = {"file": fname, "size": size}
                continue

            try:
                await download_one(client, message, dest, size)
                downloaded += 1
                bytes_total += size
                manifest[str(message.id)] = {"file": fname, "size": size}
                print(f"  [OK] {fname}")
                if downloaded % 10 == 0:
                    save_manifest(cfg.download_dir, manifest)
            except Exception as exc:
                failed += 1
                failures.append((message.id, str(exc)))
                print(f"  [FAILED] message {message.id}: {exc}")

        save_manifest(cfg.download_dir, manifest)

        print("\n" + "=" * 50)
        print("  Finished.")
        print(f"  Videos found:    {found}")
        print(f"  Downloaded now:  {downloaded}")
        print(f"  Already had:     {skipped}")
        print(f"  Failed:          {failed}")
        print(f"  Data this run:   {bytes_total / (1024 * 1024):.1f} MB")
        print("=" * 50)
        if failures:
            print("\nFailed messages (just re-run the tool to retry these):")
            for mid, err in failures:
                print(f"  - {mid}: {err}")
    finally:
        await client.disconnect()


def main():
    try:
        asyncio.run(run())
    except KeyboardInterrupt:
        print("\nStopped. Re-run the tool to resume — completed files are kept.")
    except Exception as exc:
        print(f"\nError: {exc}")
        sys.exit(1)


if __name__ == "__main__":
    main()
