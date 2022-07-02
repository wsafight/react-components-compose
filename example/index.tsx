import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ArrayShow } from './array';
import { ArrayShowWithState } from './arrayWithState';
import { ArrayShowWithEvent } from './event';
import { SimpleShow } from './simple';
import { SimpleShowWithCloneElement } from './simpleWithCloneElement';
import { SimpleShowWithProps } from './simpleWithProps';

// ReactDOM.render(<SimpleShow />, document.getElementById('root'));

// ReactDOM.render(<SimpleShowWithProps />, document.getElementById('root'));

// ReactDOM.render(<SimpleShowWithCloneElement />, document.getElementById('root'));

// ReactDOM.render(<ArrayShow />, document.getElementById('root'));


// ReactDOM.render(<ArrayShowWithState />, document.getElementById('root'));

ReactDOM.render(<ArrayShowWithEvent />, document.getElementById('root'));
