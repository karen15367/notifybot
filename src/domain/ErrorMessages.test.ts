import {ErrorMessages} from './ErrorMessages';

describe('ErrorMessages', () => {
    it('should have a message for empty text', ()=>{
        expect(ErrorMessages.TEXT_EMPTY).toBeDefined();
    });

    it('should have a message for empty recipientId', ()=>{
        expect(ErrorMessages.RECIPIENT_ID_EMPTY).toBeDefined();
    })

    it('should have a message for missging message', ()=>{
        expect(ErrorMessages.MESSAGE_REQUIRED).toBeDefined();
    })

    it('shouldd have message for HTTP response', () => {
        expect(ErrorMessages.TEXT_AND_RECIPIENT_REQUIRED).toBeDefined();
        expect(ErrorMessages.MESSAGE_SENT).toBeDefined();
        expect(ErrorMessages.INTERNAL_SERVER_ERROR).toBeDefined();
    })
})