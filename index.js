import {run} from '@cycle/xstream-run';
import {div, input, p, makeDOMDriver} from '@cycle/dom';

function main(sources) {
  const sinks = {

    DOM: sources.DOM.select('input').events('click')
      // can query sources.DOM API for streams...can change 'selector' and 'eventType'
      //    for any DOM events happening on element.
      .map(ev => ev.target.checked)
      // map clicks to Virtual DOM elements displaying toggleable checkbox
      .startWith(false)
      .map(toggled =>
        div([
          // helper functions to create Virtual DOM elements..can use JSX w babel.
          input({attrs: {type: 'checkbox'}}), 'Toggle me',
          p(toggled ? 'ON' : 'off')
        ])
      )
  };
  return sinks;
}

const drivers = {
  DOM: makeDOMDriver('#app')
};

run(main, drivers);
