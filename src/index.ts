import 'dotenv/config';
import express, {Request, Response} from 'express';
import {NotifyController} from './controllers/NotifyController';
import {SendMessage} from './application/SendMessage';
import { TelegramSender } from './infrastructure/TelegramSender';
import { validateConfig } from './config/Config';

const config = validateConfig(process.env);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sender = new TelegramSender(config.telegramToken, config.telegramChatId);
const sendMessage = new SendMessage(sender);
const controller = new NotifyController(sendMessage);

app.post('/notify', (req: Request, res: Response) => controller.handle(req, res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`NotifyBot is running on port ${PORT}`);
});