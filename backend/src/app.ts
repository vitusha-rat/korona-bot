import 'module-alias/register'

import * as dotenv from 'dotenv'
dotenv.config()

import { bot } from '@/init'

import commandComposer from '@/commands'

bot.use(commandComposer)

if (!process.env.TEST) {
  bot.launch()
  console.log('Bot launched')
}
