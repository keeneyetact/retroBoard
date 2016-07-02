/* eslint import/no-unresolved: 0 */
import 'babel-polyfill';
import App from './app';
import ReactDOM from 'react-dom';
import React from 'react';
import 'react-toolbox/lib/commons';

ReactDOM.render(<App />, document.getElementById('content'));
