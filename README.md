# quickdev-cli (qdev)

A fast, zero-dependency CLI toolkit for everyday developer tasks.

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
