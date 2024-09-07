import { Response } from "express";
import { StatusCodes } from "http-status-codes";

class ServerErrorResponse {
  public message: string;
  public success: number;
  public error: string;
  constructor(res: Response, error: unknown) {
    const response = {
      message: "Internal server error",
      success: false,
      error: error,
      status: StatusCodes.INTERNAL_SERVER_ERROR,
    };
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
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
      status: StatusCodes.BAD_REQUEST,
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
      status: StatusCodes.BAD_REQUEST,
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
      status: StatusCodes.NOT_FOUND,
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
      status: StatusCodes.UNAUTHORIZED,
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
      status: StatusCodes.FORBIDDEN,
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
      status: StatusCodes.FORBIDDEN,
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
