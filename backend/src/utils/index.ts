import { Context } from 'telegraf'

export const createLoading = async (
  ctx: Context,
  loadingMessage = '<b>Loading...</b>'
) => {
  const message = await ctx.reply(loadingMessage, { parse_mode: 'HTML' })

  return async (msg: string) =>
    await ctx.telegram.editMessageText(
      message.chat.id,
      message.message_id,
      undefined,
      msg,
      { parse_mode: 'HTML' }
    )
}

export const nowTimestamp = () => {
  return Math.floor(Date.now() / 1000)
}

export const envArray = (env?: string) => {
  return env?.split('-').map((a) => a.toLowerCase()) ?? []
}

export const getEnvs = () => ({
  MM_WALLETS: envArray(process.env.MM_WALLETS),
  PROFIT_WALLETS: envArray(process.env.PROFIT_WALLETS),
  QUOTE_TOKEN: process.env.QUOTE_TOKEN,
  BASE_TOKEN: process.env.BASE_TOKEN,
  RPC: process.env.RPC,
  BLOCK_CREATED: process.env.BLOCK_CREATED,
  ROUTER: process.env.ROUTER,
})
