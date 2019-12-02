import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Route } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history'
import createRootReducer from './redux/rootReducer'

import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

export const history = createBrowserHistory()

const composingTool = composeWithDevTools || compose

const store = createStore(
    createRootReducer(history),
    composingTool(
      applyMiddleware(
        routerMiddleware(history),
        thunk
      )
    ),
  )

ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Route component={App} />
      </ConnectedRouter>
    </Provider>
    , document.getElementById('root'));
//
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
