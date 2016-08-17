# Cycle.js app


## Instructions
- Install Babel via Browserify, no CLI or Require hook.
- https://babeljs.io/docs/setup/#installation


## Common problem-solving pattern for Cycle.js
"formulate the computer’s behavior as a function of streams: continuously listen to source messages from drivers and continuously provide sinks messages (e.g. Virtual DOM elements) to the drivers."


## Setup cycle.js boilerplate
- https://github.com/edge/cyc, dev + production ready.
- babel, hot reloading, isomorphic server.
- https://github.com/cyclejs/cyclejs/tree/master/examples


## Architecture

## HCI (human/computer interaction)
- Message passing
- two-way process, computer + human. Both listen + speak. mutual observation.
- Reactive Programming model.
- Haskell follows same with stream-based I/O.
- SO:
> Computer -> output (screen) -> senses (eyes) -> human
> Human -> actuators (finger) -> input (mouse click) -> Computer

- Computers HCI expressed as (pure function)
~~~~
function computer(inputDevices) {
  // define the behavior of `outputDevices` somehow
  return outputDevices;
}
~~~~
- can use Composition of functions to make up `computer()`.
- `inputDevices` aka `senses`. `outputDevices` aka `actuators`.
~~~~
function human(senses) {
  // define the behavior of `actuators` somehow
  return actuators;
}
~~~~

### Reactive Streams
- Cycle uses reactive + functional streams. core principle. e.g. Observable from RxJS.
> "Observables are lazy event streams which can emit zero or more events, and may or may not finish."

- originated from ReactiveX, a Reactive Programming library.
- APPROACH A
 - FOO->  BAR (foo owns arrow)
 - foo does network request, increment counter in bar.
~~~~
// This is inside the Foo module

function onNetworkRequest() {
  // ...
  Bar.incrementCounter();
  // ...
}
~~~~
 - SO:
 - BAR: Passive (allows other modules to change state).
 - FOO: Proactive (responsible for making BAR's state function correctly. Bar unaware of it).
- APPROACH B:
 - FOO  ->BAR (bar owns arrow, not inverted tho)
~~~~
// This is inside the Bar module

Foo.addOnNetworkRequestListener(() => {
 self.incrementCounter(); // self is Bar
});
~~~~
 - BAR: Reactive (responsible managing own state by reacting external events)
 - FOO: Listenable (unaware of arrow originating from its action)
 - NOW bar listens to event happening in Foo, manages own state
- WHY B BETTER:
 - Inversion of control
   - bar responsible for itself
   - not expose bars internal state management (i.e. call incrementCounter internally)
 - Separation of concerns
   - self-responsible modules focusing on own functionality rather than changing external state.
- SUMMARY:
 - Reactive and Passive seem to be dual to each other
 - Passive/Proactive programming default way of working for most programmers in Imperative languages.
 - paradigm shift difficult.
 - best Reactive libraries RxJS or xstream
- HOW:
 - basically event listeners
 - Stream in xstream is an event stream which can emit zero or more events
 - if finishes emits error or complete event.
 ~~~~
 Stream contract: (next)* (complete|error){0,1}
 ~~~~
 - streams listened to like EventEmitters + DOM events
~~~~
 myStream.addListener({
   next: function handleNextEvent(event) {
     // do something with `event`
   },
   error: function handleError(error) {
     // do something with `error`
   },
   complete: function handleCompleted() {
     // do something when it completes
   },
 });
~~~~
 - can transform them with operators, pure functions that create new Streams on top of existing ones.
~~~~
 const clickCountStream = clickStream
  // each click represents "1 amount"
  .mapTo(1)
  // sum all events `1` over time, starting from 0
  .fold((count, x) => count + x, 0);
~~~~
 - currently 26 operators (https://github.com/staltz/xstream#methods-and-operators) for all patterns.
 - READ UP ON "reactive streams programming" http://cycle.js.org/streams.html
 



## GOOD
- Guide seems smooth and walks you through each point.
- Hello World works.
- Split into MANY seperate packages, DOM/HTTP/rxjs/xstream/jsonp
- Holistic approach, can do many things.

## BAD
- relies on external lib xstream (custom built for Cycle.js tho) and rxjs stuff.
