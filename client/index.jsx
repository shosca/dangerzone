import './main.less';

import util from 'util';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import io from 'socket.io-client';

import App from './components/App';
import {LogsContainer} from './components/Logs';
import {SessionsContainer} from './components/Sessions';
import {QueriesContainer} from './components/Queries';
import makeStore from './store';

const socket = io.connect(`${location.hostname}` + location.port ? `:${location.port}` : '');

const store = makeStore(socket);

const routes = <Route path="/" component={App}>
    <IndexRoute component={SessionsContainer} />
    <Route path="queries" component={QueriesContainer} />
</Route>;

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
            {routes}
        </Router>
    </Provider>,
    document.getElementById('app')
);

export function getSocket() { return socket; }
