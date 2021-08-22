import { ValidationError } from 'class-validator';

export function covertErrorToObject(errors: ValidationError[]) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  const result: Record<string, unknown> = {};

  for (const error of errors) {
    result[error.property] = Object.values(error.constraints)[0];
    if (Object.keys(error.children).length > 0) {
      result[error.property] = covertErrorToObject(error.children);
    }
  }

  return result;
}
