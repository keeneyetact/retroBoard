import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    Main
} from './pages';

export default (store) => {


  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Main}/>
    </Route>
  );
};
