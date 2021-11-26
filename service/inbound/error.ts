import { StandardError } from '../../common/error';
import { StatusCodes } from '../../common/http';
import { InboundStatus } from '../../common/inboundStatus';

export const InboundServiceError = {
    INBOUND_ID_NOT_FOUND: new StandardError('Inbound ID not found.', StatusCodes.BAD_REQUEST),
    PAGE_NOT_FOUND: new StandardError('Page not found.', StatusCodes.BAD_REQUEST),
    STATUS_NOT_VALID: (status: InboundStatus): StandardError => {
        switch (status) {
            case InboundStatus.ACCEPTED:
                return new StandardError(
                    'Accepted Status only can be changed into Received Status.',
                    StatusCodes.BAD_REQUEST
                );
            case InboundStatus.REJECTED:
                return new StandardError(
                    'Rejected Status can not be changed.',
                    StatusCodes.BAD_REQUEST
                );
            case InboundStatus.REQUESTING:
                return new StandardError(
                    'Requesting Status only can be changed into Accepted/Rejected Status.',
                    StatusCodes.BAD_REQUEST
                );
            case InboundStatus.RECEIVED:
                return new StandardError(
                    'Received Status can not be changed.',
                    StatusCodes.BAD_REQUEST
                );
        }
    },
};
