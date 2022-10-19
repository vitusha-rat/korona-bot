import { getCoronaPrice, getGarantexPrice } from '@/services/info'
import { Composer } from 'grammy'

export const startParsing = new Composer()

startParsing.command('startBot', async (ctx) => {
  setInterval(async () => {
    const coronaPrice = await getCoronaPrice()
    const garantexPrice = await getGarantexPrice()
    ctx.reply(
      `Corona Price: ${coronaPrice?.exchangeRate}, Garantex Price: ${garantexPrice}`
    )
  }, 5000)
})
