export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = "API_ERROR";
  }
}

export const handleError = (
  error: unknown,
  message = "Internal server error"
) => {
  console.error(`[Error]`, error);

  if (error instanceof ApiError) {
    return {
      success: false,
      message: error.message,
      statusCode: error.statusCode,
    };
  }

  return { success: false, message, statusCode: 500 };
};
