import 'module-alias/register'

import * as dotenv from 'dotenv'
dotenv.config()

import { bot } from '@/init'
import { session } from 'grammy'
import { conversations, createConversation } from '@grammyjs/conversations'
import { setNumber } from '@/conversations/setNumberCons'
import { startParsing } from './commands/info'

bot.use(session({ initial: () => ({}) }))
bot.use(conversations())
bot.use(createConversation(setNumber))

bot.command('setNumber', async (ctx) => {
  await ctx.reply('Write down new number!')
  await ctx.conversation.enter('setNumber')
})

bot.use(startParsing)

if (!process.env.TEST) {
  bot.start()
  console.log('Bot launched')
}
