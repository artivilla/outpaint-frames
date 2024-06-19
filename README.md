# collection of outpaint frames

This is a collection of OSS frames by Outpaint you can re-use for your own projects.

nounish (locahost:3000/nounish) is a fun little quiz where you earn a unique rarity cap color based on the points you accumulate.

### built upon

airstack API
frames.js (https://framesjs.org) framework
upstash (https://upstash.com) for redis storage
deployment on vercel

### getting started

```
bun install
bun run dev:monorepo
```

###todo

- add in frame txn
- add ability to submit delivery address on IO via farcaster signin (farcaster username + email to send receipt + store txnId)
- upload images per cap
- bg image per quiz
- validate upstash
