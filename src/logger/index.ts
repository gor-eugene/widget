export enum AmoLoggerLevel {
  OFF,
  WARNING,
  ERRORS,
  DEBUG,
  ALL
}

export enum AmoLoggerType {
  INFO = 'info',
  WARNING = 'warn',
  ERROR = 'error',
  TRACE = 'trace'
}

export class AmoLogger {
  constructor(protected level: AmoLoggerLevel = AmoLoggerLevel.ERRORS) {}

  private levelTypes = {
    [AmoLoggerLevel.OFF]: [],
    [AmoLoggerLevel.ALL]: [
      AmoLoggerType.INFO,
      AmoLoggerType.WARNING,
      AmoLoggerType.ERROR,
      AmoLoggerType.TRACE
    ],
    [AmoLoggerLevel.WARNING]: [AmoLoggerType.WARNING, AmoLoggerType.ERROR],
    [AmoLoggerLevel.ERRORS]: [AmoLoggerType.ERROR],
    [AmoLoggerLevel.DEBUG]: [AmoLoggerType.WARNING, AmoLoggerType.ERROR, AmoLoggerType.TRACE]
  }

  log(type: AmoLoggerType = AmoLoggerType.INFO, ...opts: any[]): void {
    const types = this.levelTypes[this.level] as AmoLoggerType[]

    if (types.includes(type)) {
      console[type](...opts)
    }
  }

  info(...opts: any[]) {
    return this.log(AmoLoggerType.INFO, ...opts)
  }

  warn(...opts: any[]) {
    return this.log(AmoLoggerType.WARNING, ...opts)
  }

  error(...opts: any[]) {
    return this.log(AmoLoggerType.ERROR, ...opts)
  }

  trace(...opts: any[]) {
    return this.log(AmoLoggerType.TRACE, ...opts)
  }
}
