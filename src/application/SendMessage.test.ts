import {SendMessage} from "./SendMessage";
import {MessageSender} from "../domain/MessageSender";
import {Message} from "../domain/Message";

describe('SendMessage', () => {
    it('should send a valid message', async () => {
        const mockSender: MessageSender = {
            send: jest.fn().mockResolvedValue(undefined)
        };

        const useCase = new SendMessage(mockSender);
        const message = new Message("Hola mundo", "karen_123");
        await useCase.execute(message);
        
        expect(mockSender.send).toHaveBeenCalledWith(message);
        expect(mockSender.send).toHaveBeenCalledTimes(1);
    });
    it('should throw if sender fails', async () => {
        const mockSender: MessageSender = {
            send: jest.fn().mockRejectedValue(new Error("Telegram error"))
        };

        const useCase = new SendMessage(mockSender);
        const message = new Message("Hola mundo", "karen_123");

        await expect(useCase.execute(message)).rejects.toThrow("Telegram error");
    });
    it('should throw if message is null', async () => {
        const mockSender: MessageSender = {
            send: jest.fn()
        };

        const useCase = new SendMessage(mockSender);
        await expect(useCase.execute(null as any)).rejects.toThrow("Message is required");
    });
});

