import { Injector } from './Injector';

export type InjectionTarget = Function | symbol | number | string | undefined;

export type CorrespondingType<
  TContext,
  T extends InjectionToken<TContext>
> = T extends InjectorToken
  ? Injector<TContext>
  : T extends TargetToken
  ? Function | undefined
  : T extends keyof TContext
  ? TContext[T]
  : never;

export type CorrespondingTypes<
  TContext,
  TS extends readonly InjectionToken<TContext>[]
> = {
  [K in keyof TS]: TS[K] extends InjectionToken<TContext>
    ? CorrespondingType<TContext, TS[K]>
    : never;
};

export type InjectorToken = '$injector';
export type TargetToken = '$target';
export const INJECTOR_TOKEN: InjectorToken = '$injector';
export const TARGET_TOKEN: TargetToken = '$target';
export type InjectionToken<TContext> =
  | InjectorToken
  | TargetToken
  | keyof TContext;

export type InjectableClass<
  TContext,
  R,
  Tokens extends readonly InjectionToken<TContext>[]
> = ClassWithInjections<TContext, R, Tokens> | ClassWithoutInjections<R>;

export interface ClassWithInjections<
  TContext,
  R,
  Tokens extends readonly InjectionToken<TContext>[]
> {
  new (...args: CorrespondingTypes<TContext, Tokens>): R;
  readonly inject: Tokens;
}

export type ClassWithoutInjections<R> = new () => R;

export type InjectableLazyClass<
  TContext,
  R,
  Tokens extends readonly InjectionToken<TContext>[]
> = () => Promise<
  ClassWithInjections<TContext, R, Tokens> | ClassWithoutInjections<R>
>;

export type InjectableFunction<
  TContext,
  R,
  Tokens extends readonly InjectionToken<TContext>[]
> =
  | InjectableFunctionWithInject<TContext, R, Tokens>
  | InjectableFunctionWithoutInject<R>;

export interface InjectableFunctionWithInject<
  TContext,
  R,
  Tokens extends readonly InjectionToken<TContext>[]
> {
  (...args: CorrespondingTypes<TContext, Tokens>): R;
  readonly inject: Tokens;
}

export type InjectableFunctionWithoutInject<R> = () => R;

export type Injectable<
  TContext,
  R,
  Tokens extends readonly InjectionToken<TContext>[]
> =
  | InjectableClass<TContext, R, Tokens>
  | InjectableFunction<TContext, R, Tokens>;

export type TChildContext<
  TParentContext,
  TProvided,
  CurrentToken extends string
> = {
  [K in keyof (TParentContext & {
    [K in CurrentToken]: TProvided;
  })]: K extends CurrentToken
    ? TProvided
    : K extends keyof TParentContext
    ? TParentContext[K]
    : never;
};
