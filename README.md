### Everything is built around this [lib](https://github.com/nicojs/typed-inject) so all credit goes to _Nico Jansen_ ([@\_nicojs](https://twitter.com/_nicojs))

I took the [typed-inject](https://github.com/nicojs/typed-inject) lib from _Nico Jansen_ and tried to enrich it with lazy class loader.

#### Use case:

On a TS/JS front-end project, I want to register all my services and their config inside my DI container withour having to think about lazyloading anything, so as long as I never resolve one service, its js file and all of its dependencies are never loaded on the browser.

With this behavior I can build really complicated app with a single big container, so every services are potentially accessibles, but depending on what it's currently used on the active page, only the required files will be loaded to the client.

#### Goals:

- A Symfony-like service config, easy to read and maintain
- A really small lib ~ 1KB
- Strong typechecking and meaningfull errors
- Lazy class loading
- ...
