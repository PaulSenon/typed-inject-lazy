import { createInjector } from './DI/InjectorImpl';
import ConsoleLogger from './services/ConsoleLogger';
import DebugLogger from './services/DebugLogger';
import MyServiceA from './services/MyServiceA';
import MyServiceB from './services/MyServiceB';
import { Scope } from './DI/Scope';

// const injector = createInjector()
//   .provideClass('logger-a', ConsoleLogger)
//   // .provideClass('logger-b', DebugLogger)
//   .provideClass('myService', MyServiceA);

// injector.resolve('myService').sayHello();

const injector2 = createInjector()
  // .provideClass('logger-a', ConsoleLogger)
  .provideLazyClass(
    'logger-a',
    async () => {
      const { default: ConsoleLogger } = await import(
        './services/ConsoleLogger'
      );
      return ConsoleLogger;
    },
    Scope.Singleton
  )
  .provideLazyClass(
    'logger-b',
    async () => {
      const { default: DebugLogger } = await import('./services/DebugLogger');
      return DebugLogger;
    },
    Scope.Singleton
  )
  .provideLazyClass(
    'myServiceA',
    async () => {
      const { default: MyServiceA } = await import('./services/MyServiceA');
      return MyServiceA;
    },
    Scope.Singleton
  )
  .provideLazyClass('myServiceB', async () => {
    const { default: MyServiceB } = await import('./services/MyServiceB');
    return MyServiceB;
  });

(async () => {
  (await injector2.resolve('myServiceA')).sayHello();
  (await injector2.resolve('myServiceA')).sayHello();
  // (await injector2.resolve('myServiceB')).disBonjour();
  // (await injector2.resolve('logger-a')).log('test a');
  // (await injector2.resolve('logger-b')).log('test b');
})();
