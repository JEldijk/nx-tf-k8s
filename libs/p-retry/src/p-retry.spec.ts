import pRetry, { AbortError, Options } from './index';
describe('HttpService', () => {
  it('should be able to import', () => {
    expect(pRetry).toBeTruthy();
    expect(AbortError).toBeDefined();
    const options: Options = { retries: 10 };
    expect(options).toBeDefined();
  });
});
