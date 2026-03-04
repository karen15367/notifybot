import {TelegramSender} from "./TelegramSender";
import { Message } from "../domain/Message";

describe('TelegramSender', () => {
    it('should send a message to Telegram', async () => {
        const sender = new TelegramSender(
            process.env.TELEGRAM_TOKEN!,
            process.env.TELEGRAM_CHAT_ID!
        );
        const message = new Message('hello from NotifyBot!', 'karen_123');
        await expect(sender.send(message)).resolves.toBeUndefined();
    });
});