import {
  isSaveError,
  toSaveError,
  getErrorMessage,
  getErrorStack,
  SaveError,
} from './save-error';

describe('Error handling functions', () => {
  describe('isSaveError', () => {
    it('should return true if the error is an instance of SaveError', () => {
      const saveError = new SaveError('Test error');
      expect(isSaveError(saveError)).toBe(true);
    });

    it('should return false if the error is not an instance of SaveError', () => {
      const error = new Error('Test error');
      expect(isSaveError(error)).toBe(false);
    });
  });

  describe('toSaveError', () => {
    it('should return the original error if it is an instance of SaveError', () => {
      const saveError = new Error('Test error');
      const result = toSaveError(saveError);
      expect(result).toBe(new SaveError('Test error'));
    });

    it('should create a new SaveError from an unknown error', () => {
      const error = 'Test error';
      const saveError = toSaveError(error);
      expect(saveError).toBeInstanceOf(SaveError);
      expect(saveError.message).toBe('"Test error"');
    });
  });

  describe('getErrorMessage', () => {
    it('should return the message of an SaveError', () => {
      const saveError = new SaveError('Test error');
      expect(getErrorMessage(saveError)).toBe('Test error');
    });

    it('should create a new SaveError from an unknown error and return its message', () => {
      const error = 'Test error';
      expect(getErrorMessage(error)).toBe('"Test error"');
    });
  });

  describe('getErrorStack', () => {
    it('should return the stack of an SaveError', () => {
      const saveError = new SaveError('Test error');
      expect(getErrorStack(saveError)).toContain('SaveError');
    });

    it('should create a new SaveError from an unknown error and return its stack', () => {
      const error = 'Test error';
      const stack = getErrorStack(error);
      expect(stack).toContain('SaveError');
      expect(stack).toContain('no-stack-available');
    });
  });
});
