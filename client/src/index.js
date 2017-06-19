// npm packages
import 'rxjs';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';

// styles
import 'mdbootstrap/css/bootstrap.min.css';
import 'mdbootstrap/css/mdb.min.css';
import './css/main.scss';

// our packages
import App from './app';
import store from './store';

// our pages
import Connect4Page from './pages/connect4';
import NPuzzlePage from './pages/nPuzzle';
import NQueenPage from './pages/nQueen';
import MainPage from './pages/main';
import Home from './pages/home';
import NotFound from './pages/notfound';

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

// render on page
ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="main" component={MainPage} />
        <Route path="npuzzle" component={NPuzzlePage} />
        <Route path="nqueen" component={NQueenPage} />
        <Route path="connect4" component={Connect4Page} />
        <Route path="redirect.html" />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>
), document.getElementById('app'));
