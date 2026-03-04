import {Request, Response} from 'express';
import {SendMessage} from '../application/SendMessage';
import {Message} from '../domain/Message';
import { AppError } from '../domain/AppError';
import { ErrorMessages } from '../domain/ErrorMessages';


export class NotifyController {
    constructor(private sendMessage: SendMessage) {}

    async handle(req: Request, res: Response): Promise<void> {
        const {text, recipientId} = req.body;

        if (!text || !recipientId) {
        res.status(400).json({error: ErrorMessages.TEXT_AND_RECIPIENT_REQUIRED});
        return;
        }

        try {
            const message = new Message(text, recipientId);
            await this.sendMessage.execute(message);
            res.status(200).json({message: ErrorMessages.MESSAGE_SENT});
        } catch (error) {
            if(error instanceof AppError){
                res.status(error.statusCode).json({error: error.message});//error conocido: codigo http especifico(400,404,etc)
            }
            else{
                res.status(500).json({error: ErrorMessages.INTERNAL_SERVER_ERROR}); // error desconocido: siempre 500
            }
        }
    }
}