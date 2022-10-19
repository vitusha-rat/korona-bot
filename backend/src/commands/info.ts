import { percentage } from '@/conversations/setNumberCons'
import { getCoronaPrice, getGarantexPrice } from '@/services/info'
import { Composer } from 'grammy'

export const startParsing = new Composer()

startParsing.command('startBot', async (ctx) => {
  let coronaPricePrev = 0
  setInterval(async () => {
    const { check, coronaPrice } = await coronaPriceCheck(coronaPricePrev)
    coronaPricePrev = coronaPrice

    // if (!check) return

    const garantexPrice = await getGarantexPrice()
    const exceeds = differanceCalculations(coronaPrice, garantexPrice, percentage)

    if (!exceeds) return

    ctx.reply(`Corona Price: ${coronaPrice}, Garantex Price: ${garantexPrice}`)
  }, 5000)
})

const coronaPriceCheck = async (
  prevValue: number
): Promise<{ check: boolean; coronaPrice: number }> => {
  const coronaPrice = (await getCoronaPrice())?.exchangeRate

  if (!coronaPrice) return { check: false, coronaPrice: 404 }

  if (Math.abs(coronaPrice - prevValue) <= 0.01) return { check: false, coronaPrice }

  return { check: true, coronaPrice }
}

const differanceCalculations = (
  coronaPrice: number,
  garantexPrice: number,
  percentage: number
): boolean => {
  const percentageDiff = Math.abs((coronaPrice / garantexPrice) * 100) - percentage

  console.log(percentageDiff)
  if (percentageDiff < 0.8) return false

  return true
}
