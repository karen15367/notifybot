import 'dotenv/config';
import express, {Request, Response} from 'express';
import {NotifyController} from './controllers/NotifyController';
import {SendMessage} from './application/SendMessage';
import { TelegramSender } from './infrastructure/TelegramSender';
import { validateConfig } from './config/Config';
import { ScheduledMessage } from './application/ScheduledMessage';
import { CronScheduler } from './infrastructure/CronScheduler';

const config = validateConfig(process.env);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sender = new TelegramSender(config.telegramToken, config.telegramChatId);
const sendMessage = new SendMessage(sender);
const controller = new NotifyController(sendMessage);

const scheduled = new ScheduledMessage(sendMessage, config.scheduledMessage, config.telegramChatId);
const scheduler = new CronScheduler('0 * * * *', () => scheduled.execute());
scheduler.start();

app.post('/notify', (req: Request, res: Response) => controller.handle(req, res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`NotifyBot is running on port ${PORT}`);
    console.log(`Scheduled message active: "${config.scheduledMessage}"`);
});