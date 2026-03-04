import * as cron from 'node-cron';

export class CronScheduler {
    private task: cron.ScheduledTask | null = null;

    constructor(
        private readonly cronExpression: string,
        private readonly job: () => Promise<void>
    ) {}
    
    start(): void {
        this.task = cron.schedule(this.cronExpression, async () => {
            await this.job();
        });
    }

    stop(): void {
        if (this.task) {
            this.task.stop();
        }
    }
}