import {Message} from '../domain/Message';
import {MessageSender} from '../domain/MessageSender';
import { ErrorMessages } from '../domain/ErrorMessages';


export class SendMessage {
    constructor(private readonly sender: MessageSender) {}

    async execute(message: Message): Promise<void> {
        if(!message) throw new Error (ErrorMessages.MESSAGE_REQUIRED);
        await this.sender.send(message);
    }
}