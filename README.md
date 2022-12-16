# 🦣 super RE-toot

![build](https://github.com/chaostreff-flensburg/superretoot/actions/workflows/build.yml/badge.svg)

## 🤷 About

With super RE-toot you can easily automate re-toots/re-blogs from your [Mastodon](https://docs.joinmastodon.org/) account.
It only retoots, toots from accounts which are in a List and are using a certain hashtag. Both values can be [configured](#config).

## 💻 Techstack

The software is written in node.js.

### 🕸️ Dependencies

| Name | Version |
| -- | -- |
| [dotenv](https://www.npmjs.com/package/dotenv) | ^16.0.3 |
| [masto](https://www.npmjs.com/package/masto) | ^4.10.0|

## ✔️ Config

### config.json

Stores all config information.

| Key | Description | Example |
| -- | -- | -- |
| instanceUrl | URL of your instance account | https://mastodon.social |
| ownAccountName | Your account name without | example_bot |
| listName | Your list Name | reoot |
| tag | The tag for filtering | retoot |
| statusesLimit | Limit on the amount of statuses | 2 |

### .env

Stores the `TOKEN` information. You can generate a `TOKEN` by going to: Settings -> development. Create a new app, you can choose your own name. The app needs to `read` and `write`. After that you will be able to create the Token. Keep this token a secret.

## 🚀 How to install and run

- Git clone thie Repo.
- Copy the .env.example to .env and change fill in your TOKEN.
- Copy the config.example.json to config.json and fill in your matching values.
- Create a cronjob like the following one runs the script every 5 minutes.

```
*/5 * * * * cd /your/path/to/the/repe && docker run -v "$(pwd)"/config.json:/app/config.json:ro -v "$(pwd)"/.env:/app/.env:ro ghcr.io/chaostreff-flensburg/superretoot:latest >/dev/null 2>&1
```

## ☠️ Limitations

Be aware of the [Mastodon Rate](https://docs.joinmastodon.org/api/rate-limits/) limit!

## ⚖️ License

[gpl-3.0](./LICENSE)
