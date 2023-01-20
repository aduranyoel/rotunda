/**
 * An interface to log information in the application.
 * Depending on each implementation, how to deal with the messages.
 */
export interface Logger {
  logInfo(info: string): void;

  logWarning(warning: string): void;

  logError(error: string): void;
}

/**
 * Indicates the different log levels.
 */
export enum LogLevel {
  // the standard log level indicating that something happened
  INFO = 'INFO',
  // the log level that indicates that something unexpected happened in the application
  WARN = 'WARN',
  // the log level that should be used when the application hits an issue
  ERROR = 'ERROR',
}
