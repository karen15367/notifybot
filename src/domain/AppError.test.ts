import {AppError, NotFoundError, ValidationError} from './AppError';

describe ('AppError', () =>{
    it('should create a ValidationError with status 400', ()=>{
        const error = new ValidationError('Invalid input');
        expect(error.message).toBe('Invalid input');
        expect(error.statusCode).toBe(400);
        expect(error instanceof AppError).toBe(true);
    });
    it('should create a NotFoundError with status 404', () =>{
        const error = new NotFoundError('Resource not found');
        expect(error.message).toBe('Resource not found');
        expect(error.statusCode).toBe(404);
        expect(error instanceof AppError).toBe(true);
    })
})