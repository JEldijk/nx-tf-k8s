const networkErrorMsgs = new Set([
  'Failed to fetch',
  'NetworkError when attempting to fetch resource.',
  'The Internet connection appears to be offline.',
  'Network request failed',
  'fetch failed', // Undici (Node.js)
]);
export const isNetworkError = (errorMessage: string) => networkErrorMsgs.has(errorMessage);
export const getDOMException = (errorMessage: string) => globalThis.DOMException === undefined
  ? new Error(errorMessage)
  : new DOMException(errorMessage);
