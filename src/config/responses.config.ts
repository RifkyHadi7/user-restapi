export interface ApiResponse<T> {
    statusCode: number;
    message: string;
    data?: T;
    error?: string;
  }
  
  export function successResponse<T>(
    data: T,
    message = 'Success',
    statusCode = 200
  ): ApiResponse<T> {
    return { statusCode, message, data };
  }
  
  export function errorResponse(
    error: string,
    message = 'An error occurred',
    statusCode = 400
  ): ApiResponse<null> {
    return { statusCode, message, error };
  }