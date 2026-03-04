import {Message} from "./Message";

describe("Message", () => {
    it('should create a valid message', () => {
        const message = new Message("Hola mundo", "karen_123");
        expect(message.text).toBe("Hola mundo");
        expect(message.recipientId).toBe("karen_123");
    });

    it('should throw an error if text is empty', () => {
        expect(() => new Message("", "karen_123")).toThrow("Text cannot be empty");
    });

    it('should throw an error if recipientId is empty', () => {
        expect(() => new Message("Hola", '')).toThrow("Recipient ID cannot be empty");
    });
});