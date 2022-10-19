import { Telegraf } from 'telegraf'

import { Context } from 'telegraf'

class MyContext extends Context {}

export const bot = new Telegraf(process.env.BOT_TOKEN ?? '__empty__', {
  contextType: MyContext,
})
