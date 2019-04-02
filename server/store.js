import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from '../common/reducer';
import remoteMiddleware from './middleware';

export default function makeStore(io) {
    const createStoreWithMiddleware = applyMiddleware(
        thunk,
        remoteMiddleware(io)
    )(createStore);

    let store = createStoreWithMiddleware(reducer);

    io.on('connection', (sock) => {
        sock.emit('state', store.getState().toJS());
        sock.on('action', store.dispatch.bind(store));
    });

    return store;
}
