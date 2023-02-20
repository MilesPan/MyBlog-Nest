import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
export default class Validate extends ValidationPipe {
  protected flattenValidationErrors(
    validationErrors: ValidationError[],
  ): string[] {
    const message = {};
    validationErrors.forEach((error) => {
      message[error.property] = Object.values(error.constraints)[0];
    });
    throw new HttpException(
      {
        code: 422,
        message,
      },
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
