export interface GenericResponse<T> {
    data: T;
    success: boolean;
    unhandledException: boolean;
    message: string;
    exceptionMessage: string;
    innerExceptionMessage: string;
    exceptionStackTrace: string;
  }