import 'babel-polyfill';
import Index from './app/index';
import ReactDOM from 'react-dom';
import React from 'react';
import ToolboxApp from 'react-toolbox/lib/app';
import 'react-toolbox/lib/commons'

ReactDOM.render(<ToolboxApp><Index /></ToolboxApp>, document.getElementById('content'));
