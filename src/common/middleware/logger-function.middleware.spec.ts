import { LoggerFunctionMiddleware } from './logger-function.middleware';

describe('LoggerFunctionMiddleware', () => {
  it('should be defined', () => {
    expect(new LoggerFunctionMiddleware()).toBeDefined();
  });
});
