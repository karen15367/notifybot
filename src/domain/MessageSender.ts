import {Message} from "./Message";

export class MessageSender {
    send(message: Message): Promise<void> {
        throw new Error("Method not implemented.");
    }
}