import { Scope } from './Scope';
import {
  InjectionToken,
  InjectableClass,
  InjectableFunction,
  InjectableLazyClass,
  TChildContext,
} from './types';

export interface Injector<TContext = {}> {
  injectClass<R, Tokens extends readonly InjectionToken<TContext>[]>(
    Class: InjectableClass<TContext, R, Tokens>
  ): Promise<R>;
  injectFunction<R, Tokens extends readonly InjectionToken<TContext>[]>(
    Class: InjectableFunction<TContext, R, Tokens>
  ): Promise<R>;

  injectLazyClass<R, Tokens extends readonly InjectionToken<TContext>[]>(
    loader: InjectableLazyClass<TContext, R, Tokens>
  ): Promise<R>;

  resolve<Token extends keyof TContext>(
    token: Token
  ): // TContext[Token] extends InjectableLazyClass<
  //   TContext,
  //   TContext[Token],
  //   InjectionToken<TContext>[]
  // >
  //   ?
  Promise<TContext[Token]>;
  // : TContext[Token]

  provideValue<Token extends string, R>(
    token: Token,
    value: R
  ): Injector<TChildContext<TContext, R, Token>>;

  provideClass<
    Token extends string,
    R,
    Tokens extends readonly InjectionToken<TContext>[]
  >(
    token: Token,
    Class: InjectableClass<TContext, R, Tokens>,
    scope?: Scope
  ): Injector<TChildContext<TContext, R, Token>>;

  provideFactory<
    Token extends string,
    R,
    Tokens extends readonly InjectionToken<TContext>[]
  >(
    token: Token,
    factory: InjectableFunction<TContext, R, Tokens>,
    scope?: Scope
  ): Injector<TChildContext<TContext, R, Token>>;

  provideLazyClass<
    Token extends string,
    R,
    Tokens extends readonly InjectionToken<TContext>[]
  >(
    token: Token,
    factory: InjectableLazyClass<TContext, R, Tokens>,
    scope?: Scope
  ): Injector<TChildContext<TContext, R, Token>>;

  dispose(): Promise<void>;
}
