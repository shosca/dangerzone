import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import util from 'util';
import {setState, setConnectionState} from '../common/action_creators';

import reducer from '../common/reducer';

const remoteMiddleware = socket => store => next => action => {
    if (action.type === 'CLEAR')
        socket.emit('action', action)

    return next(action);
};


export default function makeStore(socket) {
    const createStoreWithMiddleware = applyMiddleware(
        thunk,
        remoteMiddleware(socket)
    )(createStore);

    const store = createStoreWithMiddleware(reducer);

    socket.on('state', state => store.dispatch(setState(state)));
    socket.on('action', action=> {
        if (action.type !== 'CLEAR') store.dispatch(action)
    });

    [
        'connect',
        'connect_error',
        'connect_timeout',
        'reconnect',
        'reconnecting',
        'reconnect_error',
        'reconnect_failed'
    ].forEach(ev => {
        socket.on(ev, () => {
            store.dispatch(setConnectionState({
                state: ev,
                connected: socket.connected
            }));
        });
    });

    return store;
}
