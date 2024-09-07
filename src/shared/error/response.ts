import { Response } from "express";
import { StatusCodes } from "http-status-codes";

class ServerErrorResponse {
  public message: string;
  public success: boolean;
  public error: unknown;
  constructor(error: unknown) {
    return {
      message: "Internal server error",
      success: false,
      error: error,
    };
  }
}

class ValidationErrorResponse {
  public message: string;
  public success: boolean;
  public error: string;
  constructor(res: Response, error: unknown) {
    const response = {
      message: "Validation error",
      success: false,
      error: error,
    };
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
}

class BadRequestErrorResponse {
  public message: string;
  public success: boolean;

  constructor(res: Response, message: unknown) {
    const response = {
      message: message,
      success: false,
    };
    res.status(StatusCodes.BAD_REQUEST).json(response);
  }
}

class NotFoundErrorResponse {
  public message: string;
  public success: boolean;

  constructor(res: Response, message: unknown) {
    const response = {
      message: message,
      success: false,
    };
    res.status(StatusCodes.NOT_FOUND).json(response);
  }
}

class AuthorizationErrorResponse {
  public message: string;
  public success: boolean;

  constructor(res: Response, message: unknown) {
    const response = {
      message: message,
      success: false,
    };
    res.status(StatusCodes.UNAUTHORIZED).json(response);
  }
}

class PermissionErrorResponse {
  public message: string;
  public success: boolean;

  constructor(res: Response, message: unknown) {
    const response = {
      message: message,
      success: false,
    };
    res.status(StatusCodes.FORBIDDEN).json(response);
  }
}

class LimitReachedErrorResponse {
  public message: string;
  public success: boolean;

  constructor(res: Response, message: unknown) {
    const response = {
      message: message,
      success: false,
    };
    res.status(StatusCodes.FORBIDDEN).json(response);
  }
}

export {
  ServerErrorResponse,
  ValidationErrorResponse,
  BadRequestErrorResponse,
  NotFoundErrorResponse,
  AuthorizationErrorResponse,
  PermissionErrorResponse,
  LimitReachedErrorResponse,
};
