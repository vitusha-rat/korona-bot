import { Bot } from 'grammy'
import { MyContext } from '@/misc/types'

export const bot = new Bot<MyContext>(process.env.BOT_TOKEN ?? '__empty__')
