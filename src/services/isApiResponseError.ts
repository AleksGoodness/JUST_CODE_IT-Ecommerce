interface ApiResponseError {
  statusCode: number;
  message: string;
  errors?: {
    code: string;
    message: string;
    field?: string;
    duplicateValue?: string;
  }[];
}

function isApiResponseError(error: unknown): error is ApiResponseError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'statusCode' in error &&
    'message' in error
  );
}

export default isApiResponseError;
