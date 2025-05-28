interface CommerceToolsError {
  statusCode?: number;
  body?: {
    statusCode?: number;
    message?: string;
    errors?: {
      code: string;
      message: string;
    }[];
  };
  message?: string;
}

function isCommerceToolsError(error: unknown): error is CommerceToolsError {
  if (error === null || typeof error !== 'object') {
    return false;
  }

  const e = error as Record<string, unknown>;

  // Проверяем наличие statusCode
  const hasStatusCode = typeof e.statusCode === 'number';

  // Проверяем наличие body с нужной структурой
  let hasValidBody = false;
  if (e.body && typeof e.body === 'object' && e.body !== null) {
    const body = e.body as Record<string, unknown>;
    hasValidBody =
      typeof body.statusCode === 'number' ||
      typeof body.message === 'string' ||
      (Array.isArray(body.errors) && body.errors.every(isErrorObject));
  }

  // Проверяем наличие message
  const hasMessage = typeof e.message === 'string';

  return hasStatusCode || hasValidBody || hasMessage;
}

// Вспомогательная функция для проверки структуры ошибок в массиве
function isErrorObject(obj: unknown): obj is { code: string; message: string } {
  if (typeof obj !== 'object' || obj === null) return false;
  const o = obj as Record<string, unknown>;
  return typeof o.code === 'string' && typeof o.message === 'string';
}

export default isCommerceToolsError;
