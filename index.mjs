import { createRestAPIClient } from "masto";
import config from "./config.json" with { type: "json" };
import * as dotenv from "dotenv";
dotenv.config({ quiet: true });

const main = async () => {
  const masto = createRestAPIClient({
    url: config.instanceUrl,
    accessToken: process.env.TOKEN,
  });

  const lists = await masto.v1.lists.list();
  const list = lists.find((element) => element.title === config.listName);

  if (!list) {
    console.log("No list for retoot found!");
    return;
  }

  const accounts = await masto.v1.lists.$select(list.id).accounts.list();
  const accountIds = accounts.map((account) => account.id);

  if (!accountIds.length) {
    console.log("No Account Ids found");
    return;
  }

  for (const accountId of accountIds) {
    const toots = await masto.v1.accounts.$select(accountId).statuses.list({
      excludeReplies: true,
      limit: config.statusesLimit,
      tagged: config.tag,
    });

    for (const id of toots.map((toot) => toot.id)) {
      const retootedby = await masto.v1.statuses.$select(id).rebloggedBy.list();
      if (
        !retootedby.find(
          (element) =>
            element.url === `${config.instanceUrl}/@${config.ownAccountName}`
        )
      ) {
        await masto.v1.statuses.$select(id).reblog();
        console.log("Boost successfull!", id);
      }
    }
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
