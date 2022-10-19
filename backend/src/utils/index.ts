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
