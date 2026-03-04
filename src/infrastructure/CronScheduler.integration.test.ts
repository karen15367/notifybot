import {CronScheduler} from './CronScheduler';

describe('CronScheduler', () => {
    it('should execute the task when is triggered', async () => {
        const mockTask = jest.fn().mockResolvedValue(undefined);
        const scheduler = new CronScheduler('* * * * * *', mockTask);

        scheduler.start();

        await new Promise(resolve => setTimeout(resolve, 1500));

        scheduler.stop();

        expect(mockTask).toHaveBeenCalled();
    });
});