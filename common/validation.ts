import { ValidationError as rawValidationError, validate as rawValidate } from 'class-validator';
import { ValidationError } from './error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function validate(item: any) {
    const errs: rawValidationError[] = await rawValidate(item);
    if (!errs || errs.length == 0) {
        return;
    }
    throw new ValidationError(errs);
}

export async function validateArray(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    item: any,
    transform: (err: rawValidationError, index?: number) => rawValidationError
) {
    item = [].concat(item);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const validatePromise: Promise<rawValidationError[]>[] = item.map((i: any) => rawValidate(i));
    const errs: rawValidationError[] = await Promise.all(validatePromise).then((values) => {
        const allRecipeErrors: rawValidationError[] = [];
        values.forEach((each, index) => {
            each = each.map((item) => transform(item, index));
            allRecipeErrors.push(...each);
        });
        return allRecipeErrors;
    });
    if (!errs || errs.length == 0) {
        return;
    }
    throw new ValidationError(errs);
}
