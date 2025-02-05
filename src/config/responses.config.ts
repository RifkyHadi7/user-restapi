export interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  data?: T;
  error?: string;
}

export function successResponse<T>(data: T, message: string): ApiResponse<T> {
  return { status: 'success', message, data };
}

export function errorResponse(
  error: string,
  message: string,
): ApiResponse<null> {
  return { status: 'error', message, error };
}
