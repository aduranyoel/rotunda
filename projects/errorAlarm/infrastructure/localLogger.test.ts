import { LocalLogger } from './localLogger';
import { Logger } from './logger';

describe('Local Logger', () => {
  let logger: Logger;
  let consoleError: jest.SpyInstance;
  let consoleWarn: jest.SpyInstance;
  let consoleLog: jest.SpyInstance;

  beforeEach(() => {
    logger = new LocalLogger();
    consoleError = jest.spyOn(console, 'error');
    consoleWarn = jest.spyOn(console, 'warn');
    consoleLog = jest.spyOn(console, 'log');
  });

  test('should send a error message to the console', () => {
    logger.logError('error test');
    expect(consoleError).toHaveBeenCalledTimes(1);
  });
  test('should send a waring message to the console', () => {
    logger.logWarning('warning test');
    expect(consoleWarn).toHaveBeenCalledTimes(1);
  });
  test('should send a info message to the console', () => {
    logger.logInfo('info test');
    expect(consoleLog).toHaveBeenCalledTimes(1);
  });
});
