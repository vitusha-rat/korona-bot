import { Context } from 'grammy'
import {
  type Conversation,
  type ConversationFlavor,
  conversations,
  createConversation,
} from '@grammyjs/conversations'

type MyContext = Context & ConversationFlavor
type MyConversation = Conversation<MyContext>

let number = 0
/** Defines the conversation */
export async function setNumber(conversation: MyConversation, ctx: MyContext) {
  await ctx.reply('Hi there! Enter new number!')
  const { message } = await conversation.wait()
  if (!message?.text) return
  console.log(number, 'before')
  number = Number(message.text)
  console.log(number, 'after')
  await ctx.reply('Cool new number!')
}
