import { StandardError } from '../../common/error';
import { StatusCodes } from '../../common/http';

enum ResponseStatus {
    OK = 'ok',
    UNAUTHORIZED = 'unauthorized',
    ERROR = 'error',
}

interface BaseResponse {
    status_code: ResponseStatus;
    data: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CreateResponse(status: ResponseStatus, data: any): BaseResponse {
    return {
        status_code: status,
        data: data,
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CreateResponseError(error: any) {
    const response: BaseResponse = {
        status_code: ResponseStatus.ERROR,
        data: {
            code: StatusCodes.INTERNAL_SERVER_ERROR,
        },
    };
    if (error instanceof Error) {
        response.data.details = error.message;
    } else {
        response.data.details = error;
    }
    return response;
}

function CreateResponseStandardError(error: StandardError) {
    return {
        status_code: ResponseStatus.ERROR,
        data: {
            code: error.code,
            details: error.details,
        },
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BaseDTOConstructor = function (source: any, dest: any) {
    const allowedKeys: string[] = Object.keys(dest);
    Object.assign(dest, source);
    Object.keys(dest)
        .filter((key) => allowedKeys.indexOf(key) === -1)
        .forEach((key) => {
            const findAndRemoveKey = (key: string) => {
                type keyType = keyof typeof dest;
                for (const k in dest) {
                    const keyCasted: keyType = k;
                    if (k === key) {
                        delete dest[keyCasted];
                        return;
                    }
                }
            };

            findAndRemoveKey(key);
        });
};

export {
    ResponseStatus,
    BaseResponse,
    CreateResponse,
    CreateResponseError,
    CreateResponseStandardError,
    BaseDTOConstructor,
};
