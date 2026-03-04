import {validateConfig} from './Config'

describe ('Config', () => {
    it('should return config when all env vars are present', () =>{
        const config = validateConfig({
            TELEGRAM_TOKEN : 'test-token',
            TELEGRAM_CHAT_ID: '12345'
        });

        expect(config.telegramToken).toBe('test-token');
        expect(config.telegramChatId).toBe('12345');
    })

    it('should throw if TELEGRAM_TOKEN is missing', () => {
        expect(() => validateConfig({TELEGRAM_CHAT_ID: '12345'}))
        .toThrow('Missing required env var: TELEGRAM_TOKEN');
    });

    it('Should throw if TELEGRAM_CHAT_ID is missing', () => {
        expect(() => validateConfig({ TELEGRAM_TOKEN: 'test-token'}))
        .toThrow('Missing required env var: TELEGRAM_CHAT_ID');
    })
})