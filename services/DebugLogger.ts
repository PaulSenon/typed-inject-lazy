import ILogger from './ILogger';
console.log('### DebugLogger loaded');

export default class DebugLogger implements ILogger {
  constructor() {
    console.log('##### DebugLogger instanciated');
  }
  log(m: string) {
    console.log(`DebugLogger: ${m}`);
  }
}
