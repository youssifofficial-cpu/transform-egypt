#!/usr/bin/env bash
# Install Claude Code CLI inside a Replit (or generic Linux) shell.
# Safe to re-run; bails early if already installed.

set -euo pipefail

NPM_PREFIX="${HOME}/.npm-global"
LOCAL_BIN="${HOME}/.local/bin"

log() { printf '\033[1;34m[setup]\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m[warn ]\033[0m %s\n' "$*" >&2; }
err()  { printf '\033[1;31m[error]\033[0m %s\n' "$*" >&2; }

ensure_path() {
    case ":${PATH}:" in
        *":$1:"*) ;;
        *) export PATH="$1:${PATH}" ;;
    esac
}

ensure_path "${LOCAL_BIN}"
ensure_path "${NPM_PREFIX}/bin"

if command -v claude >/dev/null 2>&1; then
    log "claude already installed at $(command -v claude)"
    claude --version || true
    exit 0
fi

log "Trying official installer..."
if curl -fsSL https://claude.ai/install.sh | bash; then
    ensure_path "${LOCAL_BIN}"
else
    warn "Official installer failed; falling back to npm."
    if ! command -v npm >/dev/null 2>&1; then
        err "npm is not available. Install Node.js in Replit (Tools > Packages) and re-run."
        exit 1
    fi
    mkdir -p "${NPM_PREFIX}"
    npm config set prefix "${NPM_PREFIX}"
    ensure_path "${NPM_PREFIX}/bin"
    npm install -g @anthropic-ai/claude-code
fi

if ! command -v claude >/dev/null 2>&1; then
    err "Install completed but 'claude' is not on PATH."
    err "Add this to your shell profile (~/.bashrc or Replit's shell init):"
    err "    export PATH=\"${LOCAL_BIN}:${NPM_PREFIX}/bin:\$PATH\""
    exit 1
fi

log "Installed: $(command -v claude)"
claude --version

cat <<'NEXT'

Next steps
----------
1. Authenticate (pick one):
   a) Interactive login:   run `claude` and follow the URL prompt.
      In Replit, copy the printed URL into a browser tab, complete
      sign-in, then paste the auth code back into the shell.
   b) API key:             add ANTHROPIC_API_KEY in Replit's
      Secrets tab, then reopen the shell so it's exported.

2. Start a session from the repo root:
       claude

3. Persist PATH across new Replit shells by adding this line to
   ~/.bashrc (run once):
       echo 'export PATH="$HOME/.local/bin:$HOME/.npm-global/bin:$PATH"' >> ~/.bashrc
NEXT
