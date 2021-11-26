import { StandardError } from '../../common/error';
import { StatusCodes } from '../../common/http';

export const InboundServiceError = {
  PAGE_NOT_FOUND: new StandardError("Page not found.", StatusCodes.BAD_REQUEST),
}
