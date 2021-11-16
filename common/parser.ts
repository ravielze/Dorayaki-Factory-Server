import { StandardError } from './error';
import { StatusCodes } from './http';

function ParseInt(parsedString: string, property?: string): number {
    const result = parseInt(parsedString);
    if (isNaN(result) || !isFinite(result)) {
        if (!property) {
            throw new Error('Found an error while parsing integer.');
        } else {
            throw new StandardError(
                `Found an error while parsing '${property}' as integer.`,
                StatusCodes.BAD_REQUEST
            );
        }
    }
    return result;
}

export { ParseInt };
