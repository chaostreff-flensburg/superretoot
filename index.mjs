import { login } from 'masto';
import config from './config.json' assert {type: 'json'};
import * as dotenv from 'dotenv'
dotenv.config()

const main = async () => {
  const masto = await login({
    url: config.instanceUrl,
    accessToken: process.env.TOKEN,
  });

  const lists = await masto.lists.fetchAll();
  const list = lists.find (element => element.title === 'retoot');

  if (!list) {
    console.log('No list for retoot found!');
    return;
  }

  const accounts = await masto.lists.fetchAccounts(list.id);
  const accountIds = accounts.value.map(account => account.id);

  if (!accountIds) {
    console.log('No Account Ids found');
    return;
  }

  accountIds.forEach(async accountId => {
    const toots = await masto.accounts.iterateStatuses(accountId, { excludeReplies: true, limit: config.statusesLimit, tagged: config.tag }).next();
    toots.value.map(toot => toot.id).forEach( async id => {
      const retootedby = await masto.statuses.fetchRebloggedBy(id);
      if (!retootedby.find(element => element.url === `${config.instanceUrl}/@${config.ownAccountName}`)) {
        await masto.statuses.reblog(id)
        console.log('Boost successfull!', id);
      }
    });
  });
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
