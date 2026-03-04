import request from 'supertest';
import express from 'express';
import {NotifyController} from './NotifyController';
import {SendMessage} from '../application/SendMessage';
import {Message} from '../domain/Message';
import { MessageSender } from '../domain/MessageSender';
import { text } from 'node:stream/consumers';

const makeMockSender = (): MessageSender => ({
    send: jest.fn().mockResolvedValue(undefined)
});

const makeApp = (sender: MessageSender) => {
    const app = express();
    app.use(express.json());
    const useCase = new SendMessage(sender);
    const controller = new NotifyController(useCase);
    app.post('/notify', (req, res) => controller.handle(req, res));
    return app;
};


describe('POST /notify', () => {
    it('should return 200 when message is valid', async () => {
        const app = makeApp(makeMockSender());
        
        const response = await request(app)
            .post('/notify')
            .send({text: 'hola', recipientId: 'karen_123'});
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Message sent successfully');
    });

    it('should return 400 when text is missing', async () => {
        const app = makeApp(makeMockSender());
        const response = await request(app)
            .post('/notify')
            .send({recipientId: 'karen_123'});
        expect(response.status).toBe(400);
    });

    it('should return 400 when recipientId is missing', async () => {
        const app = makeApp(makeMockSender());
        const response = await request(app)
            .post('/notify')
            .send({text: 'hola'});
        expect(response.status).toBe(400);
    });
});

