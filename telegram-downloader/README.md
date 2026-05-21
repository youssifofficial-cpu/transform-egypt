# Telegram Bulk Video Downloader

Downloads **all videos** from a Telegram channel — including **private**
channels, as long as you are a member of them. It logs in with your own
Telegram account (not a bot), so it can see everything you can see.

Features:
- Downloads every video in a channel (large files supported, 2 GB+).
- **Resume-safe**: skips videos you already downloaded, so you can stop and
  re-run any time.
- Progress bar for each file.
- Handles Telegram rate limits automatically.

---

## Setup on Windows

### 1. Install Python
- Download Python 3.9 or newer: https://www.python.org/downloads/
- In the installer, **tick "Add Python to PATH"**, then finish the install.

### 2. Get your Telegram API keys
- Go to https://my.telegram.org and log in with your phone number.
- Click **"API development tools"**.
- Create an app (any title/short-name is fine).
- Copy the **`api_id`** (a number) and **`api_hash`** (a long string).

### 3. Run setup
- Double-click **`setup.bat`**.
  It installs everything and creates a `config.ini` file.

### 4. Fill in config.ini
- Open **`config.ini`** in Notepad.
- Paste your `api_id` and `api_hash`.
- Leave `channel` **blank** — the tool will list your channels so you can
  pick the right one.
- Save the file.

### 5. Download
- Double-click **`run.bat`**.
- The **first time**, Telegram sends a login code to your Telegram app —
  type it in. (If you use two-step verification, also enter your password.)
  This happens only once; a session file is saved for next time.
- Pick the channel from the numbered list.
- Videos download into the `downloads` folder.

To get new videos later, just run `run.bat` again — it only downloads
what you don't already have.

---

## config.ini settings

| Setting        | What it does                                                        |
|----------------|---------------------------------------------------------------------|
| `api_id`       | Your numeric API id from my.telegram.org. **Required.**             |
| `api_hash`     | Your API hash from my.telegram.org. **Required.**                   |
| `channel`      | Leave blank to pick from a list, or set a @username / numeric id.   |
| `download_dir` | Folder for saved videos (default: `downloads`).                     |
| `min_id` / `max_id` | Optional. Limit to a message-id range. `0` = no limit.         |

---

## Notes
- Only use this on channels **you have legitimate access to** and content
  you are allowed to download.
- `config.ini` and the `*.session` file contain your credentials/login —
  they are git-ignored and must **not** be shared.
- If you see "Rate-limited by Telegram; waiting…", that is normal — the tool
  pauses and continues by itself.
