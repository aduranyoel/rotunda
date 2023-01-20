import { Logger, LogLevel } from './logger';

export class LocalLogger implements Logger {
  logError(error: string): void {
    console.error(this.formatMessage(LogLevel.ERROR, error));
  }

  logInfo(info: string): void {
    console.log(this.formatMessage(LogLevel.INFO, info));
  }

  logWarning(warning: string): void {
    console.warn(this.formatMessage(LogLevel.WARN, warning));
  }

  private formatMessage(level: LogLevel, text: string): string {
    return `[${level}] [${new Date().toLocaleString()}]: ${text}`;
  }
}
