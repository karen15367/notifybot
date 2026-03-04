import {ValidationError} from './AppError';
import { ErrorMessages } from './ErrorMessages';

export class Message {
    readonly text: string;
    readonly recipientId: string;

    constructor(text: string, recipientId: string) {
        Message.validate(text, recipientId);
        this.text = text;
        this.recipientId = recipientId;
    }

    private static validate(text: string, recipientId: string): void {
        if(text === '') throw new ValidationError(ErrorMessages.TEXT_EMPTY);
        if(recipientId === '') throw new ValidationError(ErrorMessages.RECIPIENT_ID_EMPTY);
    }
}
