import 'dotenv/config';
import express, {Request, Response} from 'express';
import {NotifyController} from './controllers/NotifyController';
import {SendMessage} from './application/SendMessage';
import { TelegramSender } from './infrastructure/TelegramSender';
import { TelegramReceiver } from './infrastructure/TelegramReceiver';
import { validateConfig } from './config/Config';
import { ScheduledMessage } from './application/ScheduledMessage';
import { CronScheduler } from './infrastructure/CronScheduler';
import { HandleCommand } from './application/HandleCommand';

const config = validateConfig(process.env);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//dependecnias
const sender = new TelegramSender(config.telegramToken, config.telegramChatId);
const useCase = new SendMessage(sender);
const controller = new NotifyController(useCase);

// mensajes programados
const scheduled = new ScheduledMessage(useCase, config.scheduledMessage, config.telegramChatId);
const scheduler = new CronScheduler('0 * * * *', () => scheduled.execute());
scheduler.start();

// chatbot
const handler = new HandleCommand();
const receiver = new TelegramReceiver(config.telegramToken, handler, sender);
receiver.start();

app.post('/notify', (req: Request, res: Response) => controller.handle(req, res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`NotifyBot is running on port ${PORT}`);
    console.log(`Scheduled message active: "${config.scheduledMessage}"`);
});