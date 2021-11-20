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

function ParseBoolean(parsedString?: string): boolean {
    if (!parsedString) {
        return false;
    }

    switch (parsedString.toLowerCase().trim()) {
        case 'true':
        case '1':
        case 'yes':
            return true;
    }
    return false;
}

export { ParseInt, ParseBoolean };
