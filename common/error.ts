import { StatusCodes } from './http';

export class StandardError extends Error {
    constructor(public details: string, public code: StatusCodes) {
        super();
        if (code < 400 || code > 599) {
            throw new Error('😱 Non-error HTTP Codes returned');
        }
    }
}
