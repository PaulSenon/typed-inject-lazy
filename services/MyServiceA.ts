import ILogger from './ILogger';

console.log('### MyServiceA loaded');

export default class MyServiceA {
  public static inject = ['logger-a'] as const;

  constructor(private logger: ILogger) {
    console.log('##### MyServiceA instanciated');
  }

  sayHello() {
    this.logger.log('Hello from service A');
  }
}
