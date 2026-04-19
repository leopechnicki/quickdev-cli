#!/usr/bin/env node

/**
 * quickdev-cli (qdev)
 *
 * A fast CLI toolkit for common developer tasks:
 *   qdev uuid [count]       - Generate UUIDs
 *   qdev pass [length]      - Generate secure password
 *   qdev hash <text>        - Generate MD5/SHA hashes
 *   qdev b64e <text>        - Base64 encode
 *   qdev b64d <text>        - Base64 decode
 *   qdev lorem [count]      - Generate lorem ipsum paragraphs
 *   qdev ts                 - Current Unix timestamp
 *   qdev ip                 - Show local IP addresses
 *   qdev random <min> <max> - Random number in range
 *   qdev slug <text>        - Convert text to URL slug
 *   qdev jwt <token>        - Decode JWT token (no verification)
 */

const crypto = require('crypto');
const os = require('os');

const [,, cmd, ...args] = process.argv;

const commands = {
  uuid() {
    const count = parseInt(args[0]) || 1;
    for (let i = 0; i < Math.min(count, 100); i++) {
      console.log(crypto.randomUUID());
    }
  },

  pass() {
    const length = Math.min(Math.max(parseInt(args[0]) || 20, 4), 128);
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
    const bytes = crypto.randomBytes(length);
    const password = Array.from(bytes).map(b => chars[b % chars.length]).join('');
    console.log(password);
  },

  hash() {
    const text = args.join(' ');
    if (!text) return console.error('Usage: qdev hash <text>');
    console.log(`MD5:    ${crypto.createHash('md5').update(text).digest('hex')}`);
    console.log(`SHA1:   ${crypto.createHash('sha1').update(text).digest('hex')}`);
    console.log(`SHA256: ${crypto.createHash('sha256').update(text).digest('hex')}`);
  },

  b64e() {
    const text = args.join(' ');
    if (!text) return console.error('Usage: qdev b64e <text>');
    console.log(Buffer.from(text).toString('base64'));
  },

  b64d() {
    const text = args.join(' ');
    if (!text) return console.error('Usage: qdev b64d <encoded_text>');
    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(text) || text.length % 4 !== 0) {
      return console.error(`Error: invalid base64 input: "${text}"`);
    }
    console.log(Buffer.from(text, 'base64').toString('utf-8'));
  },

  lorem() {
    const count = Math.min(parseInt(args[0]) || 3, 20);
    const words = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'.split(' ');
    const randWord = () => words[Math.floor(Math.random() * words.length)];
    const sentence = () => {
      const len = 8 + Math.floor(Math.random() * 12);
      const w = Array.from({ length: len }, randWord);
      w[0] = w[0][0].toUpperCase() + w[0].slice(1);
      return w.join(' ') + '.';
    };
    const paragraph = () => Array.from({ length: 3 + Math.floor(Math.random() * 4) }, sentence).join(' ');
    console.log(Array.from({ length: count }, paragraph).join('\n\n'));
  },

  ts() {
    const now = new Date();
    console.log(`Unix:    ${Math.floor(now.getTime() / 1000)}`);
    console.log(`Millis:  ${now.getTime()}`);
    console.log(`ISO:     ${now.toISOString()}`);
    console.log(`Local:   ${now.toLocaleString()}`);
  },

  ip() {
    const interfaces = os.networkInterfaces();
    for (const [name, addrs] of Object.entries(interfaces)) {
      for (const addr of addrs) {
        if (!addr.internal) {
          console.log(`${name}: ${addr.address} (${addr.family})`);
        }
      }
    }
  },

  random() {
    const min = parseInt(args[0]) || 1;
    const max = parseInt(args[1]) || 100;
    if (min >= max) {
      return console.error(`Error: min (${min}) must be less than max (${max})`);
    }
    const bytes = crypto.randomBytes(4);
    const num = min + (bytes.readUInt32BE(0) % (max - min + 1));
    console.log(num);
  },

  slug() {
    const text = args.join(' ');
    if (!text) return console.error('Usage: qdev slug <text>');
    console.log(text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
  },

  jwt() {
    const token = args[0];
    if (!token) return console.error('Usage: qdev jwt <token>');
    try {
      const parts = token.split('.');
      if (parts.length < 2) throw new Error('Invalid JWT');
      const header = JSON.parse(Buffer.from(parts[0], 'base64url').toString());
      const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString());
      console.log('Header:', JSON.stringify(header, null, 2));
      console.log('Payload:', JSON.stringify(payload, null, 2));
      if (payload.exp) {
        const exp = new Date(payload.exp * 1000);
        console.log(`Expires: ${exp.toISOString()} (${exp > new Date() ? 'valid' : 'EXPIRED'})`);
      }
    } catch (e) {
      console.error('Failed to decode JWT:', e.message);
    }
  },

  help() {
    console.log(`
quickdev-cli (qdev) — Developer Utilities

Commands:
  qdev uuid [count]       Generate UUIDs (default: 1)
  qdev pass [length]      Generate secure password (default: 20)
  qdev hash <text>        Generate MD5, SHA1, SHA256 hashes
  qdev b64e <text>        Base64 encode
  qdev b64d <text>        Base64 decode
  qdev lorem [count]      Generate lorem ipsum paragraphs
  qdev ts                 Show current timestamps
  qdev ip                 Show local IP addresses
  qdev random <min> <max> Random number in range
  qdev slug <text>        Convert text to URL slug
  qdev jwt <token>        Decode JWT token (no verification)
  qdev help               Show this help message

Examples:
  qdev uuid 5
  qdev pass 32
  qdev hash "hello world"
  qdev slug "My Blog Post Title!"
`);
  }
};

if (!cmd || !commands[cmd]) {
  if (cmd) console.error(`Unknown command: ${cmd}\n`);
  commands.help();
  process.exit(cmd ? 1 : 0);
} else {
  commands[cmd]();
}
