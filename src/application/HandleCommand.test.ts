import {HandleCommand} from './HandleCommand';

describe('HandleCommand', () => {
    it('should respond to /start', async () => {
        const handler = new HandleCommand();
        const response = await handler.execute('/start');
        expect(response).toContain('Bienvenido');
    });
    it('should respond to /help', async () => {
        const handler = new HandleCommand();
        const response = await handler.execute('/help');
        expect(response).toContain('/start');
        expect(response).toContain('/help');
        expect(response).toContain('/hora');
        expect(response).toContain('/status');
    });
    it('should respond to /hora', async () => {
        const handler = new HandleCommand();
        const response = await handler.execute('/hora');
        expect(response).toContain('Son las');
    });
    it('should respond to /status', async () => {
        const handler = new HandleCommand();
        const response = await handler.execute('/status');
        expect(response).toContain('activo');
    });
    it('should respond to unknown command', async () => {
        const handler = new HandleCommand();
        const response = await handler.execute('/unknown');
        expect(response).toContain('/help');
    });
});