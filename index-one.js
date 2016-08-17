import {run} from '@cycle/xstream-run';
import {div, input, p, makeDOMDriver} from '@cycle/dom';
import xs from 'xstream';

function main(sources) {
// input sources follow same structure as output sinks (object with DOM property).
  const sinks = {
      // xs is an xstream stream
    DOM: xs.periodic(1000).map(i =>
      h1('' + i + ' seconds elapsed')
    )
      // so main, sends stream as messages to DOM driver.
      // SINKS: outgoing messages.
      // stream emits Virtual DOM <h1> elements
  };
  return sinks;
}

const drivers = {
  DOM: makeDOMDriver('#app') // returns driver function to interact with DOM.
};

// main entry point for app
run(main, drivers);
