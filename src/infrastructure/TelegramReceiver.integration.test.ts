import { TelegramReceiver } from "./TelegramReceiver";
import { HandleCommand } from "../application/HandleCommand";
import { TelegramSender } from "./TelegramSender";

describe('TelegramReceiver', () => {
    let receiver: TelegramReceiver;

    afterEach(() => {
        if (receiver) {
            receiver.stop();
        }
    });

    
    it('should initilize without errors', () => {
        const sender = new TelegramSender(
            process.env.TELEGRAM_TOKEN!,
            process.env.TELEGRAM_CHAT_ID!
        );
        const handler = new HandleCommand();
        receiver = new TelegramReceiver(
            process.env.TELEGRAM_TOKEN!,
            handler,
            sender
        );
        expect(receiver).toBeDefined();
    }
    );
});