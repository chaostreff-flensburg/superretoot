# 🦣 super RE-toot

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

| Key | Description | Example |
| -- | -- | -- |
| instanceUrl | URL of your instance account | https://mastodon.social |
| ownAccountName | Your account name without | example_bot |
| listName | Your list Name | reoot |
| tag | The tag for filtering | retoot |
| statusesLimit | Limit on the amount of statuses | 2 |

## ☠️ Limitations

Be aware of the [Mastodon Rate](https://docs.joinmastodon.org/api/rate-limits/) limit!

## ⚖️ License

[gpl-3.0](./LICENSE)