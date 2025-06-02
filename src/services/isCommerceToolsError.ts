export interface CommerceToolsError {
  statusCode: number;
  message: string;
  errors?: {
    code: string;
    message: string;
    field?: string;
    action?: {
      action: string;
      email?: string;
    };
    actionIndex?: number;
    duplicateValue?: string;
  }[];
}

export interface CustomApiError {
  status: number;
  data: {
    message: string;
    errors?: {
      code: string;
      message: string;
      field?: string;
    }[];
  };
}

export function isCommerceToolsError(
  error: unknown,
): error is
  | { body: CommerceToolsError }
  | { error: CommerceToolsError }
  | CommerceToolsError {
  if (error === null || typeof error !== 'object') return false;

  const e = error as Record<string, unknown>;

  if (e.body && typeof e.body === 'object') {
    const body = e.body as Record<string, unknown>;
    return (
      typeof body.statusCode === 'number' && typeof body.message === 'string'
    );
  }

  if (e.error && typeof e.error === 'object') {
    const err = e.error as Record<string, unknown>;
    return (
      typeof err.statusCode === 'number' && typeof err.message === 'string'
    );
  }

  return typeof e.statusCode === 'number' && typeof e.message === 'string';
}

export function getCommerceToolsError(
  error:
    | { body: CommerceToolsError }
    | { error: CommerceToolsError }
    | CommerceToolsError,
): CommerceToolsError {
  if ('body' in error) return error.body;
  if ('error' in error) return error.error;
  return error;
}
