import { Message } from "../domain/Message";
import { SendMessage } from "./SendMessage";

export class ScheduledMessage {
    private readonly message: Message;

    constructor(
        private readonly sendMessage: SendMessage,
        text: string,
        recipientId: string
    ) {
        this.message = new Message(text, recipientId);
    }
    async execute(): Promise<void> {
        await this.sendMessage.execute(this.message);
    }
}