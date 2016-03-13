import Index from './app/index';
import HelloWorld from './app/components/HelloWorld';
import ReactDOM from 'react-dom';
import React from 'react';
import ToolboxApp from 'react-toolbox/lib/app';
import 'react-toolbox/lib/commons'

ReactDOM.render(<ToolboxApp><Index /><HelloWorld /></ToolboxApp>, document.getElementById('content'));
