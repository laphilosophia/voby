
<p align="center">
  <a href="https://voby.dev">
    <img src="./resources/banner/svg/banner-light-rounded.svg" alt="Voby's Banner" width="640px" height="320px">
  </a>
</p>

<p align="center">
  <a href="https://discord.gg/E6pK7VpnjC">
    <img src="./resources/discord/button.png" alt="Join The Discord Chat" width="175px" height="56.5px">
  </a>
  <a href="https://codesandbox.io/s/voby-playground-7w2pxg">
    <img src="./resources/playground/button.png" alt="Open The Playground" width="175px" height="56.5px">
  </a>
  <a href="https://opencollective.com/voby">
    <img src="./resources/collective/button.png" alt="Donate With Open Collective" width="175px" height="56.5px">
  </a>
</p>

# [Voby](https://voby.dev)

A high-performance framework with fine-grained observable/signal-based reactivity for building rich applications.

## Features

This works similarly to [Solid](https://www.solidjs.com), but without a custom Babel transform and with a different API.

- **No VDOM**: there's no VDOM overhead, the framework deals with raw DOM nodes directly.
- **No stale closures**: functions are always executed afresh, no need to worry about previous potential executions of the current function, ever.
- **No rules of hooks**: hooks are just regular functions, which you can nest indefinitely, call conditionally, use outside components, whatever you want.
- **No dependencies arrays**: the framework is able to detect what depends on what else automatically, no need to specify dependencies manually.
- **No props diffing**: updates are fine grained, there's no props diffing, whenever an attribute/property/class/handler/etc. should be updated it's updated directly and immediately.
- **No key prop**: you can just map over arrays, or use the `For` component with an array of unique values, no need to specify keys explicitly.
- **No Babel**: there's no need to use Babel with this framework, it works with plain old JS (plus JSX if you are into that). As a consequence we have 0 transform function bugs, because we don't have a transform function.
- **No magic**: what you see is what you get, your code is not transformed to actually do something different than what you write, there are no surprises.
- **No server support**: for the time being this framework is focused on local-first rich applications, most server-related features are not implemented: no hydration, no server components, no streaming etc.
- **Observable-based**: observables, also known as "signals", are at the core of our reactivity system. The way it works is very different from a React-like system, it may be more challenging to learn, but it's well worth the effort.
- **Work in progress**: this is probably beta software, I'm working on it because I need something with great performance for [Notable](https://github.com/notable/notable), I'm allergic to third-party dependencies, I'd like something with an API that resonates with me, and I wanted to deeply understand how the more solid [Solid](https://www.solidjs.com), which you should also check out, works.

## Demos

You can find some demos and benchmarks below, more demos are contained inside the repository.

- Playground (CodeSandbox): https://codesandbox.io/s/voby-playground-7w2pxg
- Playground (StackBlitz): https://stackblitz.com/edit/vitejs-vite-azlrzl?file=src%2Fcounter.tsx
- Benchmark: https://krausest.github.io/js-framework-benchmark/current.html
- Counter: https://codesandbox.io/s/voby-demo-counter-23fv5
- Clock: https://codesandbox.io/s/voby-demo-clock-w1e7yb
- Emoji Counter: https://codesandbox.io/s/voby-demo-emoji-counter-j91iz2
- HyperScript: https://codesandbox.io/s/voby-demo-hyperscript-h4rf38
- HTML Template Literal: https://codesandbox.io/s/voby-demo-html-lvfeyo
- Single-file HTML: https://codesandbox.io/s/voby-demo-html-dueygt?file=/public/index.html
- Spiral: https://codesandbox.io/s/voby-demo-spiral-ux33p6
- Store Counter: https://codesandbox.io/s/voby-demo-store-counter-kvoqrw
- Triangle: https://codesandbox.io/s/voby-demo-triangle-l837v0
- Boxes: https://codesandbox.io/s/voby-demo-boxes-wx6rqb

## APIs

| [Methods](#methods)                   | [Components](#components)         | [Hooks](#hooks-core) <sub>core</sub> | [Hooks](#hooks-web) <sub>web</sub>          | [Types](#types)                                     | [Extras](#extras)               |
| ------------------------------------- | --------------------------------- | ------------------------------------ | ------------------------------------------- | --------------------------------------------------- | ------------------------------- |
| [`$`](#methods)                       | [`Dynamic`](#dynamic)             | [`useBoolean`](#useboolean)          | [`useAbortController`](#useabortcontroller) | [`Context`](#context)                               | [`Contributing`](#contributing) |
| [`$$`](#methods)                      | [`ErrorBoundary`](#errorboundary) | [`useCleanup`](#usecleanup)          | [`useAbortSignal`](#useabortsignal)         | [`Directive`](#directive)                           | [`Globals`](#globals)           |
| [`batch`](#batch)                     | [`For`](#for)                     | [`useContext`](#usecontext)          | [`useAnimationFrame`](#useanimationframe)   | [`DirectiveOptions`](#directiveoptions)             | [`JSX`](#jsx)                   |
| [`createContext`](#createcontext)     | [`Fragment`](#fragment)           | [`useDisposed`](#usedisposed)        | [`useAnimationLoop`](#useanimationloop)     | [`EffectOptions`](#effectoptions)                   | [`Tree Shaking`](#tree-shaking) |
| [`createDirective`](#createdirective) | [`If`](#if)                       | [`useEffect`](#useeffect)            | [`useEventListener`](#useeventlistener)     | [`FunctionMaybe`](#functionmaybe)                   | [`TypeScript`](#typescript)     |
| [`createElement`](#createelement)     | [`KeepAlive`](#keepalive)         | [`useMemo`](#usememo)                | [`useFetch`](#usefetch)                     | [`MemoOptions`](#memooptions)                       |                                 |
| [`h`](#h)                             | [`Portal`](#portal)               | [`usePromise`](#usepromise)          | [`useIdleCallback`](#useidlecallback)       | [`Observable`](#observable)                         |                                 |
| [`hmr`](#hmr)                         | [`Suspense`](#suspense)           | [`useReadonly`](#usereadonly)        | [`useIdleLoop`](#useidleloop)               | [`ObservableLike`](#observablelike)                 |                                 |
| [`html`](#html)                       | [`Switch`](#switch)               | [`useResolved`](#useresolved)        | [`useInterval`](#useinterval)               | [`ObservableReadonly`](#observablereadonly)         |                                 |
| [`isBatching`](#isbatching)           | [`Ternary`](#ternary)             | [`useResource`](#useresource)        | [`useMicrotask`](#usemicrotask)             | [`ObservableReadonlyLike`](#observablereadonlylike) |                                 |
| [`isObservable`](#isobservable)       |                                   | [`useRoot`](#useroot)                | [`useTimeout`](#usetimeout)                 | [`ObservableMaybe`](#observablemaybe)               |                                 |
| [`isServer`](#isserver)               |                                   | [`useSelector`](#useselector)        |                                             | [`ObservableOptions`](#observableoptions)           |                                 |
| [`isStore`](#isstore)                 |                                   | [`useSuspended`](#usesuspended)      |                                             | [`Resource`](#resource)                             |                                 |
| [`lazy`](#lazy)                       |                                   | [`useUntracked`](#useuntracked)      |                                             | [`StoreOptions`](#storeoptions)                     |                                 |
| [`render`](#render)                   |                                   |                                      |                                             |                                                     |                                 |
| [`renderToString`](#rendertostring)   |                                   |                                      |                                             |                                                     |                                 |
| [`resolve`](#resolve)                 |                                   |                                      |                                             |                                                     |                                 |
| [`store`](#store)                     |                                   |                                      |                                             |                                                     |                                 |
| [`template`](#template)               |                                   |                                      |                                             |                                                     |                                 |
| [`tick`](#tick)                       |                                   |                                      |                                             |                                                     |                                 |
| [`untrack`](#untrack)                 |                                   |                                      |                                             |                                                     |                                 |

## Usage

This framework is simply a view layer built on top of the Observable library [`oby`](https://github.com/fabiospampinato/oby), knowing how that works is necessary to understand how this works.

This framework basically re-exports everything that `oby` exports, sometimes with a slightly different interface, adjusted for usage as components or hooks, plus some additional functions.

### Methods

The following top-level functions are provided.

#### `$`

This function is just the default export of `oby`, it can be used to wrap a value in an observable.

No additional methods are attached to this function. Everything that `oby` attaches to it is instead exported as components and hooks.

[Read upstream documentation](https://github.com/fabiospampinato/oby#core).

Interface:

```ts
function $ <T> (): Observable<T | undefined>;
function $ <T> ( value: undefined, options?: ObservableOptions<T | undefined> ): Observable<T | undefined>;
function $ <T> ( value: T, options?: ObservableOptions<T> ): Observable<T>;
```

Usage:

```tsx
import {$} from 'voby';

// Create an observable without an initial value

$<number> ();

// Create an observable with an initial value

$(1);

// Create an observable with an initial value and a custom equality function

const equals = ( value, valuePrev ) => Object.is ( value, valuePrev );

const o = $( 1, { equals } );

// Create an observable with an initial value and a special "false" equality function, which is a shorthand for `() => false`, which causes the observable to always emit when its setter is called

const oFalse = $( 1, { equals: false } );

// Getter

o (); // => 1

// Setter

o ( 2 ); // => 2

// Setter via a function, which gets called with the current value

o ( value => value + 1 ); // => 3

// Setter that sets a function, it has to be wrapped in another function because the above form exists

const noop = () => {};

o ( () => noop );
```

#### `$$`

This function unwraps a potentially observable value.

[Read upstream documentation](https://github.com/fabiospampinato/oby#get).

Interface:

```ts
function $$ <T> ( value: T ): (T extends ObservableReadonly<infer U> ? U : T);
```

Usage:

```tsx
import {$$} from 'voby';

// Getting the value out of an observable

const o = $(123);

$$ ( o ); // => 123

// Getting the value out of a function

$$ ( () => 123 ); // => 123

// Getting the value out of an observable but not out of a function

$$ ( o, false ); // => 123
$$ ( () => 123, false ); // => () => 123

// Getting the value out of a non-observable and non-function

$$ ( 123 ); // => 123
```

#### `batch`

This function prevents effects from firing until the function passed to it resolves. It's largely only useful when the passed function is asynchronous, as otherwise the reactivity system is lazy so effects won't be over-executed anyway.

[Read upstream documentation](https://github.com/fabiospampinato/oby#batch).

Interface:

```ts
function batch <T> ( fn: () => Promise<T> | T ): Promise<Awaited<T>>;
function batch <T> ( value: T ): Promise<Awaited<T>>;
```

Usage:

```tsx
import {batch} from 'voby';

batch // => Same as require ( 'oby' ).batch
```

#### `createContext`

This function creates a context object, optionally with a default value, which can later be used to provide a new value for the context or to read the current value.

A context's `Provider` will register the value of context with its children.

Interface:

```ts
type ContextProvider<T> = ( props: { value: T, children: JSX.Element } ) => JSX.Element;
type Context<T> = { Provider: ContextProvider<T> };

function createContext <T> ( defaultValue?: T ): Context<T>;
```

Usage:

```tsx
import {createContext, useContext} from 'voby';

const App = () => {
  const Context = createContext ( 123 );
  return (
    <>
      {() => {
        const value = useContext ( Context );
        return <p>{value}</p>;
      }}
      <Context.Provider value={312}>
        {() => {
          const value = useContext ( Context );
          return <p>{value}</p>;
        }}
      </Context.Provider>
    </>
  );
};
```

#### `createDirective`

This function creates a directive provider, which can be used to register a directive with its children.

A directive is a function that always receives an `Element` as its first argument, which is basically a ref to the target element, and arbitrary user-provided arguments after that.

Each directive has a unique name and it can be called by simply writing `use:directivename={[arg1, arg2, ...argN]]}` in the JSX.

Directives internally are registered using context providers, so you can also override directives for a particular scope just by registering another directive with the same name closer to where you are reading it.

A directive's `Provider` will register the directive with its children, which is always what you want, but it can lead to messy code due to nesting.

A directive's `register` function will register the directive with the current parent observer, which is usually only safe to do at the root level, but it will lead to very readable code.

Interface:

```ts
type DirectiveFunction = <T extends unknown[]> ( ref: Element, ...args: T ) => void;
type DirectiveProvider = ( props: { children: JSX.Element } ) => JSX.Element;
type DirectiveRef<T extends unknown[]> = ( ...args: T ) => (( ref: Element ) => void);
type DirectiveRegister = () => void;
type Directive = { Provider: DirectiveProvider, ref: DirectiveRef, register: DirectiveRegister };

function createDirective <T extends unknown[] = []> ( name: string, fn: DirectiveFunction<T>, options?: DirectiveOptions ): Directive;
```

Usage:

```tsx
import {createDirective, useEffect} from 'voby';

// First of all if you are using TypeScript you should extend the "JSX.Directives" interface, so that TypeScript will know about your new directive

namespace JSX {
  interface Directives {
    tooltip: [title: string] // Mapping the name of the directive to the array of arguments it accepts
  }
}

// Then you should create a directive provider

const TooltipDirective = createDirective ( 'tooltip', ( ref, title: string ) => {

  useEffect ( () => {

    if ( !ref () ) return; // The element may not be available yet, or it might have been unmounted

    // Code that implements a tooltip for the given element here...

  });

});

// Then you can use the new "tooltip" directive anywhere inside the "TooltipDirective.Provider"

const App = () => {
  return (
    <TooltipDirective.Provider>
      <input value="Placeholder..." use:tooltip={['This is a tooltip!']} />
    </TooltipDirective.Provider>
  );
};

// You can also use directives directly by padding them along as refs

const App = () => {
  return <input ref={TooltipDirective.ref ( 'This is a tooltip!' )} value="Placeholder..." />;
};
```

#### `createElement`

This is the internal function that will make DOM nodes and call/instantiate components, it will be called for you automatically via JSX.

Interface:

```ts
function createElement <P = {}> ( component: JSX.Component<P>, props: P | null, ...children: JSX.Element[] ): () => JSX.Element);
```

Usage:

```tsx
import {createElement} from 'voby';

const element = createElement ( 'div', { class: 'foo' }, 'child' ); // => () => HTMLDivElement
```

#### `h`

This function is just an alias for the `createElement` function, it's more convenient to use if you want to use Voby in hyperscript mode just because it has a much shorter name.

Interface:

```ts
function h <P = {}> ( component: JSX.Component<P>, props: P | null, ...children: JSX.Element[] ): () => JSX.Element);
```

Usage:

```tsx
import {h} from 'voby';

const element = h ( 'div', { class: 'foo' }, 'child' ); // => () => HTMLDivElement
```

#### `hmr`

This function wraps a component and makes it HMR-aware, for implementations of HMR like Vite's, this makes the component refresh itself and its children without requiring a reload of the whole page.

For an automated way to make all your components HMR-aware check out [`voby-vite`](https://github.com/vobyjs/voby-vite) instead.

Interface:

```ts
function hmr <T extends Function> ( accept: Function, component: T ): T;
```

Usage:

```tsx
import {hmr} from 'voby';

// Define a component

const Counter = ({ value }): JSX.Element => {
  // Return something...
};

// Optionally attach components and other values to it

Counter.Button = ({ onClick }): JSX.Element => {
  // Return something...
};

Counter.INITIAL_VALUE = 0;

// Lastly export it as "default", wrapped in "hmr"
// Only components exported as "default" are supported

export default hmr ( import.meta.hot?.accept, Counter );
```

#### `html`

This function provides an alternative way to use the framework, without writing JSX or using the `h` function manually, it instead allows you to write your markup as tagged template literals.

[`htm`](https://github.com/developit/htm) is used under the hood, read its documentation.

Interface:

```ts
function html ( strings: TemplateStringsArray, ...values: any[] ): JSX.Element;
```

Usage:

```tsx
import {html, If} from 'voby';

const Counter = (): JSX.Element => {
  const value = $(0);
  const increment = () => value ( prev => prev + 1 );
  const decrement = () => value ( prev => prev - 1 );
  return html`
    <h1>Counter</h1>
    <p>${value}</p>
    <button onClick=${increment}>+</button>
    <button onClick=${decrement}>-</button>
  `;
};

// Using a custom component without registering it

const NoRegistration = (): JSX.Element => {
  return html`
    <${If} when=${true}>
      <p>content</p>
    </${If}>
  `;
};

// Using a custom component after registering it, so you won't need to interpolate it anymore

html.register ({ If });

const NoRegistration = (): JSX.Element => {
  return html`
    <If when=${true}>
      <p>content</p>
    </If>
  `;
};
```

#### `isBatching`

This function tells you if batching is currently active or not.

Interface:

```ts
function isBatching (): boolean;
```

Usage:

```tsx
import {batch, isBatching} from 'voby';

// Checking if currently batching

isBatching (); // => false

batch ( () => {

  isBatching (); // => true

});

isBatching (); // => false
```

#### `isObservable`

This function tells you if a variable is an observable or not.

Interface:

```ts
function isObservable <T = unknown> ( value: unknown ): value is Observable<T> | ObservableReadonly<T>;
```

Usage:

```tsx
import {$, isObservable} from 'voby';

isObservable ( 123 ); // => false
isObservable ( $(123) ); // => true
```

#### `isServer`

This function tells you if your code is executing in a browser environment or not.

Interface:

```ts
function isServer (): boolean;
```

Usage:

```tsx
import {isServer} from 'voby';

isServer (); // => true or false
```

#### `isStore`

This function tells you if a variable is a store or not.

Interface:

```ts
function isStore ( value: unknown ): boolean;
```

Usage:

```tsx
import {store, isStore} from 'voby';

isStore ( {} ); // => false
isStore ( store ( {} ) ); // => true
```

#### `lazy`

This function creates a lazy component, which is loaded via the provided function only when/if needed.

This function uses `useResource` internally, so it's significant for `Suspense` too.

Interface:

```ts
type LazyComponent<P = {}> = ( props: P ) => ObservableReadonly<Child>;
type LazyFetcher<P = {}> = () => Promise<{ default: JSX.Component<P> } | JSX.Component<P>>;
type LazyResult<P = {}> = LazyComponent<P> & ({ preload: () => Promise<void> });

function lazy <P = {}> ( fetcher: LazyFetcher<P> ): LazyResult<P>;
```

Usage:

```ts
import {lazy} from 'voby';

const LazyComponent = lazy ( () => import ( './component' ) );
```

#### `render`

This function mounts a component inside a provided DOM element and returns a disposer function for unmounting it and stopping all reactivity inside it.

Interface:

```ts
function render ( child: JSX.Element, parent?: HTMLElement | null ): Disposer;
```

Usage:

```tsx
import {render} from 'voby';

const App = () => <p>Hello, World!</p>;

const dispose = render ( <App />, document.body );

dispose (); // Unmounted and all reactivity inside it stopped
```

#### `renderToString`

This works just like `render`, but it returns a Promise to the HTML representation of the rendered component.

This is currently implemented in a way that works only inside a browser-like environement, so you'll need to use [JSDOM](https://github.com/jsdom/jsdom) or similar for this to work server-side, but it can work server-side too potentially.

This function automatically waits for all `Suspense` boundaries to resolve before returning.

Interface:

```ts
function renderToString ( child: JSX.Element ): Promise<string>;
```

Usage:

```tsx
import {renderToString} from 'voby';

const App = () => <p>Hello, World!</p>;

const html = await renderToString ( <App /> );
```

#### `resolve`

This function basically resolves any reactivity inside the passed argument, basically replacing every function it finds with a memo to the value of that function.

You may never need to use this function yourself, but it's necessary internally at times to make sure that a child value is properly tracked by its parent computation.

[Read upstream documentation](https://github.com/fabiospampinato/oby#resolve).

Interface:

```ts
type ResolvablePrimitive = null | undefined | boolean | number | bigint | string | symbol;
type ResolvableArray = Resolvable[];
type ResolvableObject = { [Key in string | number | symbol]?: Resolvable };
type ResolvableFunction = () => Resolvable;
type Resolvable = ResolvablePrimitive | ResolvableObject | ResolvableArray | ResolvableFunction;

function resolve <T> ( value: T ): T extends Resolvable ? T : never;
```

Usage:

```tsx
import {resolve} from 'voby';

resolve // => Same as require ( 'oby' ).resolve
```

#### `store`

This function returns a deeply reactive version of the passed object, where property accesses and writes are automatically interpreted as Observables reads and writes for you.

[Read upstream documentation](https://github.com/fabiospampinato/oby#store).

Interface:

```ts
function store <T> ( value: T, options?: StoreOptions ): T;
```

Usage:

```tsx
import {store} from 'voby';

store // => Same as require ( 'oby' ).store
```

#### `template`

This function enables constructing elements with [Solid](https://www.solidjs.com)-level performance without using the Babel transform, but also without the convenience of that.

It basically works like [sinuous](https://github.com/luwes/sinuous/tree/master)'s template function, but with a cleaner API, since you don't have to access your props any differently inside the template here.

Basically you can use this to wrap a component that doesn't directly create any observables or call any hooks to significanly improve performance when instantiating that component.

Interface:

```ts
function template <P = {}> ( fn: (( props: P ) => JSX.Element) ): (( props: P ) => () => Element);
```

Usage:

```tsx
import {template} from 'voby';

const Row = template ( ({ id, cls, label, onSelect, onRemove }) => { // Now Row is super fast to instantiate
  return (
    <tr class={cls}>
      <td class="col-md-1">{id}</td>
      <td class="col-md-4">
        <a onClick={onSelect}>{label}</a>
      </td>
      <td class="col-md-1">
        <a onClick={onRemove}>
          <span class="glyphicon glyphicon-remove" ariaHidden={true}></span>
        </a>
      </td>
      <td class="col-md-6"></td>
    </tr>
  );
});

const Table = () => {
  const rows = [ /* props for all your rows here */ ];
  return rows.map ( row => <Row {...row}> );
};
```

#### `tick`

This function forces effects scheduled for execution to be executed immediately, bypassing automatic or manual batching.

[Read upstream documentation](https://github.com/fabiospampinato/oby#tick).

Interface:

```ts
function tick (): void;
```

Usage:

```tsx
import {tick} from 'voby';

tick // => Same as require ( 'oby' ).tick
```

#### `untrack`

This function executes the provided function without creating dependencies on observables retrieved inside it.

[Read upstream documentation](https://github.com/fabiospampinato/oby#untrack).

Interface:

```ts
function untrack <T> ( fn: () => T ): T;
function untrack <T> ( value: T ): T;
```

Usage:

```tsx
import {untrack} from 'voby';

untrack // => Same as require ( 'oby' ).untrack
```

### Components

The following components are provided.

Crucially some components are provided for control flow, since regular JavaScript control flow primitives are not reactive, and we need to have reactive alternatives to them to have great performance.

#### `Dynamic`

This component is just an alternative to `createElement` that can be used in JSX, it's useful to create a new element dynamically.

Interface:

```ts
function Dynamic <P = {}> ( props: { component: ObservableMaybe<JSX.Component<P>, props?: FunctionMaybe<P | null>, children?: JSX.Element }): JSX. Element;
```

Usage:

```tsx
import {Dynamic} from 'voby';

const App = () => {
  const heading = 'h2';
  return (
    <Dynamic component={heading}>
      Some content
    </Dynamic>
  );
};
```

#### `ErrorBoundary`

The error boundary catches errors thrown inside it, and renders a fallback component when that happens.

Interface:

```ts
function ErrorBoundary ( props: { fallback: JSX.Element | (( props: { error: Error, reset: Callback } ) => JSX.Element), children: JSX.Element }): ObservableReadonly<JSX.Element>;
```

Usage:

```tsx
import {ErrorBoundary} from 'voby';

const Fallback = ({ reset, error }: { reset: () => void, error: Error }) => {
  return (
    <>
      <p>Error: {error.message}</p>
      <button onClick={error}>Recover</button>
    </>
  );
};

const SomeComponentThatThrows = () => {
  throw 'whatever';
};

const App = () => {
  return (
    <ErrorBoundary fallback={Fallback}>
      <SomeComponentThatThrows />
    </ErrorBoundary>
  );
};
```

#### `For`

This component is the reactive alternative to natively mapping over an array.

It must be called with an array, or a function that returns an array, of _unique_ values, and each of them are passed to the child function to render something.

It can be used to map over values either with a keyed (default) or unkeyed (opt-in) strategy. Read [this](https://www.stefankrause.net/wp/?p=342) for some details about the differences between those, and the [upstream documentation](https://github.com/fabiospampinato/oby#for).

Interface:

```ts
function For <T> ( props: { values: FunctionMaybe<readonly T[]>, fallback?: JSX.ELement, children: (( value: T, index: ObservableReadonly<number> ) => JSX.Element) }): ObservableReadonly<JSX.Element>;
function For <T> ( props: { values: FunctionMaybe<readonly T[]>, fallback?: JSX.ELement, pooled?: true, unkeyed?: true, children: (( value: ObservableReadonly<T>, index: ObservableReadonly<number> ) => JSX.Element) }): ObservableReadonly<JSX.Element>;
```

Usage:

```tsx
import {For} from 'voby';

const App = () => {
  const numbers = [1, 2, 3, 4, 5];
  return (
    <For values={numbers}>
      {( value ) => {
        return <p>Value: {value}</p>
      }}
    </For>
  );
};
```

#### `Fragment`

This is just the internal component used for rendering fragments: `<></>`, you probably would never use this directly even if you are not using JSX, since you can return plain arrays from your components anyway.

Interface:

```ts
function Fragment ( props: { children: JSX.Element }): JSX.Element;
```

Usage:

```tsx
import {Fragment} from 'voby';

const App = () => {
  return (
    <Fragment>
      <p>child 1</p>
      <p>child 2</p>
    </Fragment>
  );
};
```

#### `If`

This component is the reactive alternative to the native `if`.

If a function is passed as the children then it will be called with a read-only observable that contains the current, always truthy, value of the "when" condition.

Interface:

```ts
type Truthy<T = unknown> = Extract<T, number | bigint | string | true | object | symbol | Function>;

function If <T> ( props: { when: FunctionMaybe<T>, fallback?: JSX.Element, children: JSX.Element | (( value: (() => Truthy<T>) ) => JSX.Element) }): ObservableReadonly<JSX.Element>;
```

Usage:

```tsx
import {If} from 'voby';

const App = () => {
  const visible = $(false);
  const toggle = () => visible ( !visible () );
  return (
    <>
      <button onClick={toggle}>Toggle</button>
      <If when={visible}>
        <p>Hello!</p>
      </If>
    </>
  );
};
```

#### `KeepAlive`

This component allows you to create singleton instances of other components that survive their parent components being disposed, and can therefore be reused cheaply.

Components rendered inside a `KeepAlive` are detached from the rest of the reactivity graph, so they don't inherit any context provided outside of their parent `KeepAlive` wrapper.

Components rendered inside a `KeepAlive` are kept in memory until the wrapper `KeepAlive` is unmounted and `ttl` milliseconds have passed without another `KeepAlive` with the same `id` being mounted. Or never, if no `ttl` prop is provided.

Interface:

```ts
function KeepAlive ( props: { id: FunctionMaybe<string>, ttl?: FunctionMaybe<number>, children: JSX.Element } ): ObservableReadonly<JSX.Element>;
```

Usage:

```tsx
import {KeepAlive} from 'voby';

// Render some expensive component inside a KeepAlive

const App = () => {
  return (
    <KeepAlive id="some-unique-id" ttl={60_000}>
      <SomeExpensiveComponent />
    </KeepAlive>
  );
};
```

#### `Portal`

This component mounts its children inside a provided DOM element, or inside `document.body` otherwise.

The `mount` prop can also be an observable, if its value changes the portal is reparented.

The `when` prop can be used to apply the portal conditionally, if it explicitly resolves to false then children are mounted normally, as if they weren't wrapped in a portal.

Events will propagate natively, according to the resulting DOM hierarchy, not the components hierarchy.

Interface:

```ts
function Portal ( props: { when: boolean, mount?: JSX.Element, wrapper?: JSX.Element, children: JSX.Element }): (() => JSX.Element | null) & ({ metadata: { portal: HTMLDivElement } });
```

Usage:

```tsx
import {Portal} from 'voby';

const Modal = () => {
  // Some modal component maybe...
};

const App = () => {
  return (
    <Portal mount={document.body}>
      <Modal />
    </Portal>
  );
};
```

#### `Suspense`

This component is like `If`, the reactive alternative to the native `if`, but the fallback branch is shown automatically while there are some resources loading in the main branch, and the main branch is kept alive under the hood.

So this can be used to show some fallback content while the actual content is loading in the background.

This component relies on `useResource` to understand if there's a resource loading or not.

This component also supports a manual "when" prop for manually deciding whether the fallback branch should be rendered or not.

Interface:

```ts
function Suspense ( props: { when?: FunctionMaybe<unknown>, fallback?: JSX.Element, children: JSX.Element }): ObservableReadonly<JSX.Element>;
```

Usage:

```tsx
import {Suspense} from 'voby';

const App = () => {
  const Content = () => {
    const resource = useResource ( () => makeSomePromise () );
    return (
      <If when={() => !resource ().pending && !resource ().error}>
        {resource ().value}
      </If>
    );
  };
  const Spinner = () => {
    return <p>Loading...</p>;
  };
  return (
    <Suspense fallback={<Spinner />}>
      <Content />
    </Suspense>
  );
};
```

#### `Switch`

This component is the reactive alternative to the native `switch`.

Interface:

```ts
function Switch <T> ( props: { when: FunctionMaybe<T>, fallback?: JSX.Element, children: JSX.Element }): ObservableReadonly<JSX.Element>;

Switch.Case = function <T> ( props: { when: T, children: JSX.Element } ): (() => JSX.Element) & ({ metadata: [T, JSX.Element] });
Switch.Default = function ( props: { children: JSX.Element } ): (() => JSX.Element) & ({ metadata: [JSX.Element] });
```

Usage:

```tsx
import {Switch} from 'voby';

const App = () => {
  const value = $(0);
  const increment = () => value ( value () + 1 );
  const decrement = () => value ( value () - 1 );
  return (
    <>
      <Switch when={value}>
        <Switch.Case when={0}>
          <p>0, the boundary between positives and negatives! (?)</p>
        </Switch.Case>
        <Switch.Case when={1}>
          <p>1, the multiplicative identity!</p>
        </Switch.Case>
        <Switch.Default>
          <p>{value}, I don't have anything interesting to say about that :(</p>
        </Switch.Default>
      </Switch>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </>
  );
};
```

#### `Ternary`

This component is the reactive alternative to the native ternary operator.

The first child will be rendered when the condition is truthy, otherwise the second child will be rendered.

Interface:

```ts
function Ternary ( props: { when: FunctionMaybe<unknown>, children: [JSX.Element, JSX.Element] } ): ObservableReadonly<JSX.Element>;
```

Usage:

```tsx
import {Ternary} from 'voby';

const App = () => {
  const visible = $(false);
  const toggle = () => visible ( !visible () );
  return (
    <>
      <button onClick={toggle}>Toggle</button>
      <Ternary when={visible}>
        <p>Visible :)</p>
        <p>Invisible :(</p>
      </Ternary>
    </>
  );
};
```

### Hooks <sub>core</sub>

The following core hooks are provided.

Most of these are just functions that `oby` provides, re-exported as `use*` functions.

#### `useBoolean`

This hook is like the reactive equivalent of the `!!` operator, it returns you a boolean, or a function to a boolean, depending on the input that you give it.

[Read upstream documentation](https://github.com/fabiospampinato/oby#boolean).

Interface:

```ts
function useBoolean ( value: FunctionMaybe<unknown> ): FunctionMaybe<boolean>;
```

Usage:

```tsx
import {useBoolean} from 'voby';

useBoolean // => Same as require ( 'oby' ).boolean
```

#### `useCleanup`

This hook registers a function to be called when the parent computation is disposed.

[Read upstream documentation](https://github.com/fabiospampinato/oby#cleanup).

Interface:

```ts
function useCleanup ( fn: () => void ): void;
```

Usage:

```tsx
import {useCleanup} from 'voby';

useCleanup // => Same as require ( 'oby' ).cleanup
```

#### `useContext`

This hook retrieves the value out of a context object.

Interface:

```ts
function useContext <T> ( context: Context<T> ): T | undefined;
```

Usage:

```tsx
import {createContext, useContext} from 'voby';

const App = () => {
  const ctx = createContext ( 123 );
  const value = useContext ( ctx );
  return <p>{value}</p>;
};
```

#### `useDisposed`

This hook returns a boolean read-only observable that is set to `true` when the parent computation gets disposed of.

[Read upstream documentation](https://github.com/fabiospampinato/oby#disposed).

Interface:

```ts
function useDisposed (): ObservableReadonly<boolean>;
```

Usage:

```tsx
import {useDisposed} from 'voby';

useDisposed // => Same as require ( 'oby' ).disposed
```

#### `useEffect`

This hook registers a function to be called when any of its dependencies change. If a function is returned it's automatically registered as a cleanup function.

[Read upstream documentation](https://github.com/fabiospampinato/oby#effect).

Interface:

```ts
function useEffect ( fn: () => (() => void) | void ): (() => void);
```

Usage:

```tsx
import {useEffect} from 'voby';

useEffect // => Same as require ( 'oby' ).effect
```

#### `useMemo`

This hook is the crucial other ingredient that we need, other than observables themselves, to have a powerful reactive system that can track dependencies and re-execute computations when needed.

This hook registers a function to be called when any of its dependencies change, and the return of that function is wrapped in a read-only observable and returned.

[Read upstream documentation](https://github.com/fabiospampinato/oby#memo).

Interface:

```ts
function useMemo <T> ( fn: () => T, options?: MemoOptions<T | undefined> ): ObservableReadonly<T>;
```

Usage:

```tsx
import {useMemo} from 'voby';

useMemo // => Same as require ( 'oby' ).memo
```

#### `usePromise`

This hook wraps a promise in an observable, so that you can be notified when it resolves or rejects.

This hook uses `useResource` internally, so it's significant for `Suspense` too.

Interface:

```ts
function usePromise <T> ( promise: FunctionMaybe<Promise<T>> ): ObservableReadonly<Resource<T>>;
```

Usage:

```tsx
import {usePromise} from 'voby';

const App = () => {
  const request = fetch ( 'https://my.api' ).then ( res => res.json ( 0 ) );
  const resource = usePromise ( request );
  return () => {
    const state = resource ();
    if ( state.pending ) return <p>pending...</p>;
    if ( state.error ) return <p>{state.error.message}</p>;
    return <p>{JSON.stringify ( state.value )}</p>
  };
};
```

#### `useReadonly`

This hook creates a read-only observable out of another observable.

[Read upstream documentation](https://github.com/fabiospampinato/oby#readonly).

Interface:

```ts
function useReadonly <T> ( observable: Observable<T> | ObservableReadonly<T> ): ObservableReadonly<T>;
```

Usage:

```tsx
import {useReadonly} from 'voby';

useReadonly // => Same as require ( 'oby' ).readonly
```

#### `useResolved`

This hook receives a value, or an array of values, potentially wrapped in functions and/or observables, and unwraps it/them.

If no callback is used then it returns the unwrapped value, otherwise it returns whatever the callback returns.

This is useful for handling reactive and non reactive values the same way. Usually if the value is a function, or always for convenience, you'd want to wrap the `useResolved` call in a `useMemo`, to maintain reactivity.

This is potentially a more convenient version of `$$`, made especially for handling nicely arguments passed that your hooks receive that may or may not be observables.

Interface:

> The precise interface for this function is insane, you can find it here: https://github.com/fabiospampinato/voby/blob/master/src/hooks/use_resolved.ts

Usage:

```tsx
import {$, useResolved} from 'voby';

useResolved ( 123 ); // => 123

useResolved ( $(123) ); // => 123

useResolved ( () => 123 ); // => 123

useResolved ( () => 123, false ); // => () => 123

useResolved ( $(123), value => 321 ); // => 321

useResolved ( [$(123), () => 123], ( a, b ) => 321 ); // => 321
```

#### `useResource`

This hook wraps the result of a function call with an observable, handling the cases where the function throws, the result is an observable, the result is a promise or an observale that resolves to a promise, and the promise rejects, so that you don't have to worry about these issues.

This basically provides a unified way to handle sync and async results, observable and non observable results, and functions that throw and don't throw.

This function is also the mechanism through which `Suspense` understands if there are things loading under the hood or not.

When the `value` property is read while fetching, or when the `latest` property is read the first time, or after an error, while fetching, then `Suspense` boundaries will be triggered.

When the `value` property or the `latest` property are read after the fetch errored they will throw, triggering `ErrorBoundary`.

The passed function is tracked and it will be automatically re-executed whenever any of the observables it reads change.

Interface:

```ts
function useResource <T> ( fetcher: (() => ObservableMaybe<PromiseMaybe<T>>) ): Resource<T>;
```

Usage:

```tsx
import {useResource} from 'voby';

const fetcher = () => fetch ( 'https://my.api' );

const resource = useResource ( fetcher );
```

#### `useRoot`

This hook creates a new computation root, detached from any parent computation.

[Read upstream documentation](https://github.com/fabiospampinato/oby#root).

Interface:

```ts
function useRoot <T> ( fn: ( dispose: () => void ) => T ): T;
```

Usage:

```tsx
import {useRoot} from 'voby';

useRoot // => Same as require ( 'oby' ).root
```

#### `useSelector`

This hook massively optimizes `isSelected` kind of workloads.

[Read upstream documentation](https://github.com/fabiospampinato/oby#selector).

Interface:

```ts
type SelectorFunction<T> = ( value: T ) => ObservableReadonly<boolean>;

function useSelector <T> ( source: () => T | ObservableReadonly<T> ): SelectorFunction<T>;
```

Usage:

```tsx
import {useSelector} from 'voby';

useSelector // => Same as require ( 'oby' ).selector
```

#### `useSuspended`

This hook returns a read-only observable that tells you if the closest suspense boundary is currently suspended or not.

[Read upstream documentation](https://github.com/fabiospampinato/oby#suspended).

Interface:

```ts
function useSuspended (): ObservableReadonly<boolean>;
```

Usage:

```tsx
import {useSuspended} from 'voby';

useSuspended // => Same as require ( 'oby' ).suspended
```

#### `useUntracked`

This hook returns an untracked version of a value.

[Read upstream documentation](https://github.com/fabiospampinato/oby#untracked).

Interface:

```ts
function useUntracked <T> ( fn: () => T ): () => T;
function useUntracked <T> ( value: T ): () => T;
```

Usage:

```tsx
import {useUntracked} from 'voby';

useUntracked // => Same as require ( 'oby' ).untracked
```

### Hooks <sub>web</sub>

The following web hooks are provided.

Most of these are just reactive alternatives to native web APIs.

#### `useAbortController`

This hook is just an alternative to `new AbortController ()` that automatically aborts itself when the parent computation is disposed.

Interface:

```ts
function useAbortController ( signals?: ArrayMaybe<AbortSignal> ): AbortController;
```

Usage:

```tsx
import {useAbortController} from 'voby';

const controller = useAbortController ();
```

#### `useAbortSignal`

This hook is just a convenient alternative to `useAbortController`, if you are only interested in its signal, which is automatically aborted when the parent computation is disposed.

Interface:

```ts
function useAbortSignal ( signals?: ArrayMaybe<AbortSignal> ): AbortSignal;
```

Usage:

```tsx
import {useAbortSignal} from 'voby';

const signal = useAbortSignal ();
```

#### `useAnimationFrame`

This hook is just an alternative to `requestAnimationFrame` that automatically clears itself when the parent computation is disposed.

Interface:

```ts
function useAnimationFrame ( callback: ObservableMaybe<FrameRequestCallback> ): Disposer;
```

Usage:

```tsx
import {useAnimationFrame} from 'voby';

useAnimationFrame ( () => console.log ( 'called' ) );
```

#### `useAnimationLoop`

This hook is just a version of `useAnimationFrame` that loops until the parent computation is disposed.

Interface:

```ts
function useAnimationLoop ( callback: ObservableMaybe<FrameRequestCallback> ): Disposer;
```

Usage:

```tsx
import {useAnimationLoop} from 'voby';

useAnimationLoop ( () => console.log ( 'called' ) );
```

#### `useEventListener`

This hook is just an alternative to `addEventListener` that automatically clears itself when the parent computation is disposed.

Interface:

```ts
function useEventListener ( target: FunctionMaybe<EventTarget>, event: FunctionMaybe<string>, handler: ObservableMaybe<( event: Event ) => void>, options?: FunctionMaybe<true | AddEventListenerOptions> ): Disposer;
```

Usage:

```tsx
import {useEventListener} from 'voby';

useEventListener ( document, 'click', console.log );
```

#### `useFetch`

This hook wraps the output of a fetch request in an observable, so that you can be notified when it resolves or rejects. The request is also aborted automatically when the parent computation gets disposed of.

This hook uses `useResource` internally, so it's significant for `Suspense` too.

Interface:

```ts
function useFetch ( request: FunctionMaybe<RequestInfo>, init?: FunctionMaybe<RequestInit> ): ObservableReadonly<Resource<Response>>;
```

Usage:

```tsx
import {useFetch} from 'voby';

const App = () => {
  const resource = useFetch ( 'https://my.api' );
  return () => {
    const state = resource ();
    if ( state.pending ) return <p>pending...</p>;
    if ( state.error ) return <p>{state.error.message}</p>;
    return <p>Status: {state.value.status}</p>
  };
};
```

#### `useIdleCallback`

This hook is just an alternative to `requestIdleCallback` that automatically clears itself when the parent computation is disposed.

Interface:

```ts
function useIdleCallback ( callback: ObservableMaybe<IdleRequestCallback>, options?: FunctionMaybe<IdleRequestOptions> ): Disposer;
```

Usage:

```tsx
import {useIdleCallback} from 'voby';

useIdleCallback ( () => console.log ( 'called' ) );
```

#### `useIdleLoop`

This hook is just a version of `useIdleCallback` that loops until the parent computation is disposed.

Interface:

```ts
function useIdleLoop ( callback: ObservableMaybe<IdleRequestCallback>, options?: FunctionMaybe<IdleRequestOptions> ): Disposer;
```

Usage:

```tsx
import {useIdleLoop} from 'voby';

useIdleLoop ( () => console.log ( 'called' ) );
```

#### `useInterval`

This hook is just an alternative to `setInterval` that automatically clears itself when the parent computation is disposed.

Interface:

```ts
function useInterval ( callback: ObservableMaybe<Callback>, ms?: FunctionMaybe<number> ): Disposer;
```

Usage:

```tsx
import {useInterval} from 'voby';

useInterval ( () => console.log ( 'called' ), 1000 );
```

#### `useMicrotask`

This hook is just an alternative to `queueMicrotask` that automatically clears itself when the parent computation is disposed, and that ensures things like contexts, error boundaries etc. keep working inside the microtask.

Interface:

```ts
function useMicrotask ( fn: () => void ): void;
```

Usage:

```tsx
import {useMicrotask} from 'voby';

useMicrotask ( () => console.log ( 'called' ) );
```

#### `useTimeout`

This hook is just an alternative to `setTimeout` that automatically clears itself when the parent computation is disposed.

Interface:

```ts
function useTimeout ( callback: ObservableMaybe<Callback>, ms?: FunctionMaybe<number> ): Disposer;
```

Usage:

```tsx
import {useTimeout} from 'voby';

useTimeout ( () => console.log ( 'called' ), 1000 );
```

### Types

#### `Context`

This type describes the object that `createContext` gives you.

Interface:

```ts
type Context<T = unknown> = {
  Provider ( props: { value: T, children: JSX.Element } ): JSX.Element
};
```

Usage:

```ts
import {useContext} from 'voby';
import type {Context} from 'voby';

// Create an alternative useContext that throws if the context is not available

const useNonNullableContext = <T> ( context: Context<T> ): NonNullable<T> => {
  const value = useContext ( context );
  if ( value === null || value === undefined ) throw new Error ( 'Missing context' );
  return value;
};
```

#### `Directive`

This type describes the object that `createDirective` gives you.

Interface:

```ts
type Directive<Arguments extends unknown[] = []> = {
  Provider: ( props: { children: JSX.Element } ) => JSX.Element,
  ref: ( ...args: Arguments ) => (( ref: Element ) => void),
  register: () => void
};
```

Usage:

```ts
import {$$, useEffect} from 'voby';
import type {Directive, FunctionMaybe} from 'voby';

// Example hook for turning a directive into a hook

const useDirective = <T extends unknown[] = []> ( directive: Directive<T> ) => {
  return ( ref: FunctionMaybe<Element | undefined>, ...args: T ): void => {
    useEffect ( () => {
      const target = $$(ref);
      if ( !target ) return;
      directive.ref ( ...args )( target );
    });
  };
};
```

#### `DirectiveOptions`

This type describes the options object that the `createDirective` function accepts.

Interface:

```ts
type DirectiveOptions = {
  immediate?: boolean // If `true` the directive is called as soon as the node is created, otherwise it also waits for that node to be attached to the DOM
};
```

Usage:

```tsx
import {createDirective} from 'voby';

// Create an regular, non-immediate, directive

const TooltipDirective = createDirective ( 'tooltip', ( ref, title: string ) => {
  // Implementation...
});

// Create an immediate directive

const TooltipDirectiveImmediate = createDirective ( 'tooltip', ( ref, title: string ) => {
  // Implementation...
}, { immediate: true } );
```

#### `EffectOptions`

This type describes the options object that the `useEffect` hook accepts.

Interface:

```ts
type EffectOptions = {
  suspense?: boolean,
  sync?: boolean | 'init'
};
```

Usage:

```tsx
import {useEffect} from 'voby';

// Make a regular asynchronous effect

useEffect ( () => {
  // Do something...
});

// Make a synchronous effect, which is strongly discouraged

useEffect ( () => {
  // Do something...
}, { sync: true } );

// Make an asynchronous effect that's executed immediately on creation, which is useful in edge cases

useEffect ( () => {
  // Do something...
}, { sync: 'init' } );

// Make an effect that won't be paused by `Suspense`, which is useful in edge cases

useEffect ( () => {
  // Do something...
}, { suspense: false } );
```

#### `FunctionMaybe`

This type says that something can be the value itself or a function that returns that value.

It's useful at times since some components, like `If`, accept `when` conditions wrapped in `FunctionMaybe`.

Interface:

```ts
type FunctionMaybe<T> = (() => T) | T;
```

Usage:

```tsx
import type {FunctionMaybe} from 'voby';

const SomeConditionalComponent = ( when: FunctionMaybe<boolean>, value: string ): JSX.Element => {
  return (
    <If when={when}>
      {value}
    </If>
  );
};
```

#### `Observable`

This type says that something is a regular observable, which can be updated via its setter.

Interface:

```ts
type Observable<T> = {
  (): T,
  ( value: T ): T,
  ( fn: ( value: T ) => T ): T,
  readonly [ObservableSymbol]: true
};
```

Usage:

```tsx
import type {Observable} from 'voby';

const fn = ( value: Observable<boolean> ): void => {
  value (); // Getting
  value ( true ); // Setting
};
```

#### `ObservableLike`

This type says that something has the same shape as a regular observable, but it may not actually be an observable.

Interface:

```ts
type ObservableLike<T> = {
  (): T,
  ( value: T ): T,
  ( fn: ( value: T ) => T ): T
};
```

Usage:

```tsx
import type {ObservableLike} from 'voby';

const fn = ( value: ObservableLike<boolean> ): void => {
  value (); // Getting
  value ( true ); // Setting
};
```

#### `ObservableReadonly`

This type says that something is a read-only observable, which can only be read but not updated.

Interface:

```ts
type ObservableReadonly<T> = {
  (): T,
  readonly [ObservableSymbol]: true
};
```

Usage:

```tsx
import type {ObservableReadonly} from 'voby';

const fn = ( value: ObservableReadonly<boolean> ): void => {
  value (); // Getting
  value ( true ); // This will throw!
};
```

#### `ObservableReadonlyLike`

This type says that something hsa the same shape as a read-only observable, but it may not actually be an observable.

Interface:

```ts
type ObservableReadonlyLike<T> = {
  (): T
};
```

Usage:

```tsx
import type {ObservableReadonlyLike} from 'voby';

const fn = ( value: ObservableReadonlyLike<boolean> ): void => {
  value (); // Getting
  value ( true ); // This is not supported!
};
```

#### `ObservableMaybe`

This type says that something can be the value itself or an observable to that value.

This is super useful if you want to write components and hooks that can accept either plain values or observables to those values.

Interface:

```ts
type ObservableMaybe<T> = Observable<T> | ObservableReadonly<T> | T;
```

Usage:

```tsx
import type {ObservableMaybe} from 'voby';

const Button = ({ label }: { label: ObservableMaybe<string> }): JSX.Element => {
  return <button>{label}</button>;
};
```

#### `MemoOptions`

This type describes the options object that the `useMemo` hook accepts.

Interface:

```ts
type MemoOptions<T> = {
  equals?: (( value: T, valuePrev: T ) => boolean) | false,
  sync?: boolean
};
```

Usage:

```tsx
import {useMemo} from 'voby';

// Make a regular asynchronous memo

useMemo ( () => {
  // Do something...
});

// Make a synchronous memo, which is strongly discouraged

useMemo ( () => {
  // Do something...
}, { sync: true } );
```

#### `ObservableOptions`

This type describes the options object that various functions can accept to tweak how the underlying observable works.

Interface:

```ts
type ObservableOptions<T> = {
  equals?: (( value: T, valuePrev: T ) => boolean) | false
};
```

Usage:

```tsx
import type {Observable, ObservableOptions} from 'voby';
import {$} from 'voby';

const createTimestamp = ( options?: ObservableOptions ): Observable<number> => {
  return $( Date.now (), options );
};
```

#### `Resource`

This is the type of object that `useResource`, `usePromise` and `useFetch` will return you.

It's an object that tells if whether the resource is loading or not, whether an error happened or not, if what the eventual resulting value is.

It's a read-only observable that holds the resulting object, but it also comes with helper methods for retrieving specific keys out of the object, which can make some code much cleaner.

Helper methods are memoized automatically for you.

Interface:

```ts
type ResourceStaticPending<T> = { pending: true, error?: never, value?: never, latest?: T };
type ResourceStaticRejected = { pending: false, error: Error, value?: never, latest?: never };
type ResourceStaticResolved<T> = { pending: false, error?: never, value: T, latest: T };
type ResourceStatic<T> = ResourceStaticPending<T> | ResourceStaticRejected | ResourceStaticResolved<T>;
type ResourceFunction<T> = { pending (): boolean, error (): Error | undefined, value (): T | undefined, latest (): T | undefined };
type Resource<T> = ObservableReadonly<ResourceStatic<T>> & ResourceFunction<T>;
```

Usage:

```tsx
import type {ObservableReadonly, Resource} from 'voby';

const resource: Resource<Response> = useResource ( () => fetch ( 'https://my.api' ) );

// Reading the static object

resource ().pending; // => true | false
resource ().error; // => Error | undefined
resource ().value; // => Whatever the resource will resolve to
resource ().latest; // => Whatever the resource will resolve to, or the previous known resolved value if the resource is pending

// Using helper methods

resource.pending (); // => true | false
resource.error (); // => Error | undefined
resource.value (); // => Whatever the resource will resolve to
resource.latest (); // => Whatever the resource will resolve to, or the previous known resolved value if the resource is pending
```

#### `StoreOptions`

This type describes the options object that the `store` function accepts.

Interface:

```ts
type StoreOptions = {
  unwrap?: boolean
};
```

Usage:

```ts
import type {StoreOptions} from 'voby';
import {store} from 'voby';

const createStore = <T> ( value: T, options?: StoreOptions ): T => {
  return store ( value, options );
};
```

### Extras

Extra features and details.

#### `Contributing`

If you'd like to contribute to this repo you should take the following steps to install Voby locally:

```sh
git clone https://github.com/vobyjs/voby.git
cd voby
npm install
npm run compile
```

Then you can run any of the demos locally like this:

```sh
# Playground
npm run dev
# Counter
npm run dev:counter
# Benchmark
npm run dev:benchmark
```

#### `Globals`

The following globals are supported.

- `VOBY`: if `true`, then Voby is used in the current client page. This is also used internally to detect if Voby has been loaded multiple times within the same page, which is not supported.

#### `JSX`

JSX is supported out of the box, as a rule of thumb it's very similar to how React's JSX works, but with some differences.

- The value provided to an attribute can always be either just the plain value itself, an observable to that value, or a function to that value. If an observable or a function is provided then that attribute will update itself in a fine-grained manner.
- There's no "key" attribute because it's unnecessary.
- Only refs in the function form are supported, so you are incentivized to simply use observables for them too.
- The "ref" attribute can also accept an array of functions to call, for convenience.
- Refs are called on the next microtask, making it so the node you'll get will probably be attached to the DOM already. For getting a more immediate reference you can use an "immediate" [directive](#createdirective).
- You can simply just use "class" instead of "className".
- The "class" attribute can also accept an object of classes or an array of classes, for convenience.
- SVGs are supported out of the box and will also be updated in a fine-grained manner.
- The "innerHTML", "outerHTML", "textContent" and "className" props are forbidden on native elements, as they are largely just footguns or non-idiomatic.
- A React-like "dangerouslySetInnerHTML" attribute is supported for setting some raw HTML.
- Numbers set as values for style properties that require a unit to be provided will automatically be suffixed with "px".
- Using CSS variables in the "style" object is supported out of the box.
- The following events are delegated, automatically: `beforeinput`, `click`, `dblclick`, `focusin`, `focusout`, `input`, `keydown`, `keyup`, `mousedown`, `mouseup`.
- Events always bubble according to the natural DOM hierarchy, there's no special bubbling logic for `Portal`.
- Class components, but with no lifecycle callbacks, are supported too. They got thrown away with the bath water by other frameworks, but organizing internal methods in a class and assigning that class to refs automatically is actually a really nice feature.

#### `Tree Shaking`

Voby is released as a tree-shakeable ESM module. The functions you don't use simply won't be included in the final bundle.

#### `TypeScript`

There are two main actions needed to make Voby work with TypeScript.

1. Voby is an ESM-only framework, so you _might_ need to mark your package as ESM too in order to use it, you can do that by putting the following in your `package.json`:
   ```
   "type": "module"
   ```
2. You should instruct TypeScript to load the correct JSX types by putting the following in your `tsconfig.json`:
   ```json
    {
      "compilerOptions": {
        "jsx": "react-jsx",
        "jsxImportSource": "voby"
      }
    }
   ```
3. Optionally, if you don't want to use a bundler or if you are using a bundler for which a plugin hasn't been written yet you can just define a "React" variable in scope and just use the JSX transform for React:
   ```ts
   import * as React from 'voby';
   ```

## Thanks

- **[reactively](https://github.com/modderme123/reactively)**: for teaching me the awesome push/pull hybrid algorithm that this library is currently using.
- **[S](https://github.com/adamhaile/S)**: for paving the way to this awesome reactive way of writing software.
- **[sinuous/observable](https://github.com/luwes/sinuous/tree/master/packages/sinuous/observable)**: for making me fall in love with Observables and providing a good implementation that this library was originally based on.
- **[solid](https://www.solidjs.com)**: for being a great sort of reference implementation, popularizing Signal-based reactivity, and having built a great community.
- **[trkl](https://github.com/jbreckmckye/trkl)**: for being so inspiringly small.

## License

MIT © Fabio Spampinato
