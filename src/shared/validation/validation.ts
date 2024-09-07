/* eslint-disable @typescript-eslint/ban-types */
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
export * from "class-validator";

export const validationPipe = async (
  schema: new () => {},
  requestObject: object,
) => {
  const transformedClass: Object = plainToInstance(schema, requestObject);

  const validationOptions = {
    whitelist: true,
    forbidNonWhitelisted: true,
  };

  const errors = await validate(transformedClass, validationOptions);

  if (errors[0]?.children?.length > 0) {
    return "Invalid file data";
  }

  if (errors.length > 0) {
    const errorResponse = errors.map((error) => {
      return `property ${error.property} has the following constraints: ${Object.values(error.constraints).join(", ")}`;
    });
    return errorResponse;
  }
  return false;
};
