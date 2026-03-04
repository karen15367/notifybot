import { ResponseMessages } from '../domain/ResponseMessages';

export class HandleCommand {
    execute(command: string): string{
        switch(command){
            case '/start':
                return ResponseMessages.START;
            case '/help':
                return ResponseMessages.HELP;
            case '/hora':
                const now = new Date();
                return `${ResponseMessages.HOUR_PREFIX} ${now.getHours()}:${now.getMinutes()}`;
            case '/status':
                return ResponseMessages.STATUS;
            default:
                return ResponseMessages.UNKNOWN_COMMAND;
        }
    }
}