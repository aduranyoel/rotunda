import { ErrorAlarmDecorator } from './infrastructure/errorAlarmDecorator';
import { LocalLogger } from './infrastructure/localLogger';
import { Logger } from './infrastructure/logger';

describe('Error Alarm', () => {
  let notificationSpy: jest.Mock;
  let consoleError: jest.SpyInstance;

  function getErrorAlarm(maxErrors: number, maxTime: number): Logger {
    return new ErrorAlarmDecorator(new LocalLogger(), {
      maxErrors,
      maxTime,
      notification: notificationSpy,
    });
  }

  beforeEach(() => {
    notificationSpy = jest.fn((error) => console.log('Sending email...', error));
    consoleError = jest.spyOn(console, 'error');
  });

  test('should notify when more than 3 errors occur in 5 seconds,', async () => {
    const errorAlarm = getErrorAlarm(3, 5);
    const totalErrors = 4;

    for (let i = 0; i < totalErrors; i++) {
      await delay(0.5, () => errorAlarm.logError('something went wrong'));
    }

    expect(consoleError).toHaveBeenCalledTimes(totalErrors);
    expect(notificationSpy).toHaveBeenCalled();
  });

  test('should not notify when less than 4 errors occur in 5 seconds,', async () => {
    const errorAlarm = getErrorAlarm(4, 5);
    const totalErrors = 3;

    for (let i = 0; i < totalErrors; i++) {
      await delay(1, () => errorAlarm.logError('something went wrong'));
    }

    expect(consoleError).toHaveBeenCalledTimes(totalErrors);
    expect(notificationSpy).not.toHaveBeenCalled();
  }, 10000);
});

function delay(seconds: number, callback: Function): Promise<void> {
  return new Promise(resolve => setTimeout(() => {
    callback();
    resolve();
  }, seconds * 1000));
}
