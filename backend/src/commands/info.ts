import composer from '.'

import { createLoading } from '@/utils'

import { getLastTrades, getCoronaPrice } from '@/services/info'

const WHITELIST = [2073130256, 256640207, 182301431, 869727093]

console.log('info')

// `info` - prints out info about asser for last 24 hours
composer.command('info', async (ctx) => {
  console.log('info handler')
  if (!WHITELIST.includes(ctx.from.id)) {
    ctx.reply('Not Auth')
    return
  }
  const answer = await createLoading(ctx)
  const ans = await getLastTrades()
  const a = await getCoronaPrice()

  await answer(`${ans}
${a[0].exchangeRate}`)

  console.log('done')
})
