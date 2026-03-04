import TelegramBot from "node-telegram-bot-api";
import { HandleCommand } from "../application/HandleCommand";
import { TelegramSender } from "./TelegramSender";

export class TelegramReceiver {
    private readonly bot: TelegramBot;
    constructor(
        token: string,
        private readonly handler: HandleCommand,
        private readonly sender: TelegramSender
    ) {
        this.bot = new TelegramBot(token, { polling: true });
    }
    start(): void {
        this.bot.on('message', async (msg) => {
            const chatId = String(msg.chat.id);
            const text = msg.text || '';
            
            const response = this.handler.execute(text);
            await this.sender.sendToChat(chatId, response);
        });
    }

    stop(): void {
        this.bot.stopPolling();
    }
}
