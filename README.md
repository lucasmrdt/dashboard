# Dashboard

## 👀 Prerequisites
- [NodeJS](https://nodejs.org/en/)
- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## 📦 Installation
```bash
npm install
```

## 🚀 Lauching
```bash
# 🚢 Docker
docker-compose build
docker-compose up
```
```bash
# 🔧 Development
npm run dev
```
```bash
# 🎉 Production
NODE_ENV=production npm run build
npm start
```
```bash
# 🕹 Test
# ⚠️ Need mongodb/redis instance to be run
npm test
```

## 🏔 Environment
> All theses keys must be added in **.env** file or in **global environment**.

|Key|Type|REQUIRED<br />(dev 🤖)|REQUIRED<br />(prod ✈️)|Description|
|:-:|:-:|:-:|:-:|:-:|
|*JWT_PUBKEY*|`string`|✅|✅|JWT Public Key|
|*PORT*|`string`|❌|❌|Server port|
|*MONGODB_URI*|`string`|❌|❌|Your mongodb URI|
|*REDIS_URI*|`string`|❌|❌|Your redis URI|
|*MONGODB_LOGIN*|`string`|❌|*depends of your mongo*|Your mongodb login|
|*MONGODB_PASSWORD*|`string`|❌|*depends of your mongo*|Your mongodb password|

## [💾 Game Configuration File](./docs/GAME-CONFIGURATION.md)

## [🧩 Scripts](./docs/SCRIPTS.md)

## [🌟 Notion](https://www.notion.so/Sp-cifications-af5b62e38013454294ebdd730b29dd19)

## [📖 API Documentation](https://documenter.getpostman.com/view/2321907/SVSGPAws?version=latest)

## 📝 Todo

### Security :
- [ ] CDN route expirable (~ 1min) pour éviter qu'elle soit détourner par d'autres utilisateurs.

### Packages :
- [ ] Changer la source du package `fuse.js` lorsque [cette PR](https://github.com/krisk/Fuse/pull/321) sera `approved`.

## 📢 Informations

### Winston warning
> Can be solve by replacing package [winston-raven-sentry](https://github.com/niftylettuce/winston-raven-sentry) with [winston-sentry-raven-transport](https://github.com/aandrewww/winston-sentry-raven-transport).<br/>
> But this one has less features (eg. user, tags, ...)

```bash
# Warning
undefined is a legacy winston transport. Consider upgrading:
- Upgrade docs: https://github.com/winstonjs/winston/blob/master/UPGRADE-3.0.md
```
