import {ScheduledMessage} from './ScheduledMessage';
import { SendMessage } from './SendMessage';
import { MessageSender } from '../domain/MessageSender';

describe('ScheduledMessage', () => {
    it('should execute SendMessage when triggered', async () => {
        const mockSender: MessageSender = {
            send: jest.fn().mockResolvedValue(undefined)
        };
        const sendMessage = new SendMessage(mockSender);
        const scheduledMessage = new ScheduledMessage(sendMessage, 'Recordatorio automático', 'karen_123');
        await scheduledMessage.execute();
        expect(mockSender.send).toHaveBeenCalledTimes(1);
        expect(mockSender.send).toHaveBeenCalledWith(
            expect.objectContaining({
                text: 'Recordatorio automático'
            })
        );
    });
    it('should throw if text is empty', async () => {
        const mockeSender: MessageSender = {
            send: jest.fn()
        };
        const sendMessage = new SendMessage(mockeSender);
        expect(() => new ScheduledMessage(sendMessage, '', 'karen_123')).toThrow('Text cannot be empty');

    });

});