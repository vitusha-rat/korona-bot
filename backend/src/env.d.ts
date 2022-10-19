declare namespace NodeJS {
  export interface ProcessEnv {
    MODE?: string
    TEST?: string
    MM_WALLETS?: string
    PROFIT_WALLETS?: string
    BOT_TOKEN?: string
    QUOTE_TOKEN?: string
    ROUTER?: string
    BASE_TOKEN?: string
    RPC?: string
    BLOCK_CREATED?: string
  }
}
