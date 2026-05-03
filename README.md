<div align="center">

# quickdev-cli

**A fast, zero-dependency CLI toolkit for everyday developer tasks.**

[![npm version](https://img.shields.io/npm/v/quickdev-cli.svg?style=flat-square&color=3b82f6)](https://www.npmjs.com/package/quickdev-cli)
[![npm downloads](https://img.shields.io/npm/dw/quickdev-cli.svg?style=flat-square&color=10b981)](https://www.npmjs.com/package/quickdev-cli)
[![license](https://img.shields.io/npm/l/quickdev-cli.svg?style=flat-square&color=6366f1)](https://github.com/leopechnicki/quickdev-cli/blob/main/LICENSE)
[![zero dependencies](https://img.shields.io/badge/dependencies-0-22c55e?style=flat-square)](https://www.npmjs.com/package/quickdev-cli)

[npm](https://npmjs.com/package/quickdev-cli) · [GitHub](https://github.com/leopechnicki/quickdev-cli)

</div>

---

## Install

```bash
npm install -g quickdev-cli
```

## Usage

```bash
qdev uuid 5          # Generate 5 UUIDs
qdev pass 32         # Generate 32-char password
qdev hash "hello"    # MD5, SHA1, SHA256 hashes
qdev b64e "text"     # Base64 encode
qdev b64d "dGV4dA==" # Base64 decode
qdev lorem 3         # 3 paragraphs of lorem ipsum
qdev ts              # Current timestamps
qdev ip              # Local IP addresses
qdev random 1 100    # Random number
qdev slug "My Post!" # URL slug: my-post
qdev jwt <token>     # Decode JWT (no verification)
```

## Why?

Because opening a browser tab for "uuid generator" or "base64 decode" is slower than typing `qdev uuid`.

## License

MIT
