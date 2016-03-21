import 'babel-polyfill';
import 'isomorphic-fetch';
import Index from './app/index';
import ReactDOM from 'react-dom';
import React from 'react';
import ToolboxApp from 'react-toolbox/lib/app';
import 'react-toolbox/lib/commons'
import fastClick from 'fastclick';
import './app/material.css';

fastClick.attach(document.body);

ReactDOM.render(<ToolboxApp><Index /></ToolboxApp>, document.getElementById('content'));
