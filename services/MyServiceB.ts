import ILogger from './ILogger';

console.log('### MyServiceB loaded');

export default class MyServiceB {
  public static inject = ['logger-b'] as const;

  constructor(private logger: ILogger) {
    console.log('##### MyServiceB instanciated');
  }

  disBonjour() {
    this.logger.log('Bonjour du service B');
  }
}
