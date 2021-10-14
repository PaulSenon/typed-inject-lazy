import ILogger from './ILogger';
console.log('### ConsoleLogger loaded');

export default class ConsoleLogger implements ILogger {
  constructor() {
    console.log('##### ConsoleLogger instanciated');
  }
  log(m: string) {
    console.log(`ConsoleLogger: ${m}`);
  }
}
