import { Logger } from './logger';

/**
 * An interface to configure the ErrorAlarmDecorator.
 */
export interface ErrorAlarmConfig {
  /**
   * The max errors allowed in the period.
   */
  maxErrors: number;
  /**
   * The lapse of time to count errors.
   */
  maxTime: number;
  /**
   * The notification callback. The alarm will call this function
   * to notify about the error
   * @param text {string} The las error message
   */
  notification: (text: string) => void;
}

/**
 * Adds new functionality to an existing Logger without changing its structure.
 * The Decorator Pattern, acts as a wrapper around an existing class.
 */
export class ErrorAlarmDecorator implements Logger {
  private logger: Logger;
  private config: ErrorAlarmConfig;

  private lastErrorDate?: Date;
  private elapsedErrors: number = 0;
  private secondsElapsed: number = 0;

  constructor(logger: Logger, config: ErrorAlarmConfig) {
    this.logger = logger;
    this.config = config;
  }

  logError(error: string): void {
    this.elapsedErrors += 1;

    this.updateElapsedTime();

    const hasExceeded = this.elapsedErrors >= this.config.maxErrors;
    const isTimeOver = this.secondsElapsed >= this.config.maxTime;

    if (hasExceeded && !isTimeOver) {
      this.config.notification(error);
      this.resetCounters();
    }

    if (isTimeOver) {
      this.resetCounters();
    }

    this.logger.logError(error);
    this.lastErrorDate = new Date();
  }

  logInfo(info: string): void {
    this.logger.logInfo(info);
  }

  logWarning(warning: string): void {
    this.logger.logWarning(warning);
  }

  private updateElapsedTime(): void {
    if (this.lastErrorDate) {
      this.secondsElapsed += (new Date().getTime() - this.lastErrorDate.getTime()) / 1000;
    }
  }

  private resetCounters(): void {
    this.elapsedErrors = 0;
    this.secondsElapsed = 0;
  }
}
