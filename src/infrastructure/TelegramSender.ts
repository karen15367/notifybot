import TelegramBot from "node-telegram-bot-api";
import {Message} from '../domain/Message';
import {MessageSender} from '../domain/MessageSender';

export class TelegramSender implements MessageSender {
    private readonly bot: TelegramBot;
    constructor(
        private readonly token: string,
        private readonly chatId: string
    ) {
        this.bot = new TelegramBot(this.token);
    }

    async send(message: Message): Promise<void> {
        await this.bot.sendMessage(this.chatId, message.text);
    }

    async sendToChat(chatId: string, text: string): Promise<void> {
        await this.bot.sendMessage(chatId, text);
    }
}
