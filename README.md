<div align="center">

# quickdev-cli

**A fast, zero-dependency CLI toolkit for everyday developer tasks.**

[![npm version](https://img.shields.io/npm/v/quickdev-cli.svg?style=flat-square&color=3b82f6)](https://www.npmjs.com/package/quickdev-cli)
[![npm downloads](https://img.shields.io/npm/dw/quickdev-cli.svg?style=flat-square&color=10b981)](https://www.npmjs.com/package/quickdev-cli)
[![license](https://img.shields.io/npm/l/quickdev-cli.svg?style=flat-square&color=6366f1)](https://github.com/leopechnicki/quickdev-cli/blob/main/LICENSE)
[![zero dependencies](https://img.shields.io/badge/dependencies-0-22c55e?style=flat-square)](https://www.npmjs.com/package/quickdev-cli)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D18-43853d?style=flat-square&logo=node.js)](https://nodejs.org)

[npm](https://npmjs.com/package/quickdev-cli) Â· [GitHub](https://github.com/leopechnicki/quickdev-cli)

</div>

---

## Install

```bash
npm install -g quickdev-cli
```

After install, the `qdev` command is available globally.

## Commands

```bash
qdev uuid [count]        # Generate UUIDs (default: 1, max: 100)
qdev pass [length]       # Generate cryptographically secure password (default: 20)
qdev hash <text>         # MD5, SHA1, SHA256 hashes
qdev b64e <text>         # Base64 encode
qdev b64d <encoded>      # Base64 decode
qdev lorem [count]       # Lorem ipsum paragraphs (default: 3, max: 20)
qdev ts                  # Current Unix, millis, ISO, and local timestamps
qdev ip                  # Local network IP addresses
qdev random <min> <max>  # Cryptographically secure random number
qdev slug <text>         # URL-safe slug
qdev jwt <token>         # Decode JWT (no verification)
qdev help                # Show command reference
```

## Examples

```bash
# Generate 5 UUIDs and copy to clipboard (macOS)
qdev uuid 5 | pbcopy

# 32-character password
qdev pass 32
# Output: kR9#mP2!vL8@nX5$qT7&wY4^zU1*cA6

# Generate all hashes for a string
qdev hash "hello world"
# MD5:    5eb63bbbe01eeed093cb22bb8f5acdc3
# SHA1:   2aae6c69ec0c4bab85f08b47c4d4e06fd2c9db03
# SHA256: b94d27b9934d3e08a52e52d7da7dabfac484efe04c94e88a8d...

# Base64 encode a JWT secret
qdev b64e "my-super-secret"
# bXktc3VwZXItc2VjcmV0

# Decode a JWT (useful for debugging auth issues)
qdev jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NSJ9.abc
# Header: { "alg": "HS256", "typ": "JWT" }
# Payload: { "sub": "12345" }

# Get current timestamps for logging
qdev ts
# Unix:    1751234567
# Millis:  1751234567890
# ISO:     2026-06-30T10:22:47.890Z
# Local:   6/30/2026, 12:22:47 PM

# Random integer (uses crypto.randomBytes â€” not Math.random)
qdev random 1 1000
# 742

# Pipe lorem ipsum into a file
qdev lorem 5 > draft.txt
```

## Shell Completion

### Bash

Add the following to your `~/.bashrc` or `~/.bash_profile`:

```bash
# quickdev-cli (qdev) bash completion
_qdev_completions() {
  local commands="uuid pass hash b64e b64d lorem ts ip random slug jwt help"
  if [ "${#COMP_WORDS[@]}" == "2" ]; then
    COMPREPLY=($(compgen -W "${commands}" -- "${COMP_WORDS[1]}"))
  fi
}
complete -F _qdev_completions qdev
```

Then reload your shell:

```bash
source ~/.bashrc
```

### Zsh

Add the following to your `~/.zshrc`:

```zsh
# quickdev-cli (qdev) zsh completion
_qdev() {
  local commands=(
    'uuid:Generate UUIDs'
    'pass:Generate secure password'
    'hash:Generate MD5/SHA hashes'
    'b64e:Base64 encode'
    'b64d:Base64 decode'
    'lorem:Generate lorem ipsum'
    'ts:Current timestamps'
    'ip:Local IP addresses'
    'random:Random number in range'
    'slug:Convert text to URL slug'
    'jwt:Decode JWT token'
    'help:Show help'
  )
  _describe 'qdev commands' commands
}
compdef _qdev qdev
```

Then reload:

```zsh
source ~/.zshrc
```

### Fish

Add the following to `~/.config/fish/completions/qdev.fish`:

```fish
set -l commands uuid pass hash b64e b64d lorem ts ip random slug jwt help
complete -c qdev -f -a "$commands"
complete -c qdev -n "__fish_seen_subcommand_from uuid" -a "(seq 1 10)" -d "count"
```

## Why?

Because opening a browser tab for "uuid generator" or "base64 decode" is slower than typing `qdev uuid`. Zero npm dependencies means nothing to audit or update.

## Comparison

| Task | Old way | With qdev |
|------|---------|-----------|
| UUID | browser tab | `qdev uuid` |
| Password | lastpass generator | `qdev pass 32` |
| Base64 | CyberChef | `qdev b64e "text"` |
| JWT decode | jwt.io (sends token) | `qdev jwt <token>` (local) |
| Hash | online tool | `qdev hash "input"` |
| Timestamps | JS console | `qdev ts` |

Note: `qdev jwt` decodes locally â€” your token never leaves your machine.

## Requirements

- Node.js >= 18.0.0

## License

MIT
