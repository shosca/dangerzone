import socketio from 'socket.io';

import makeStore from './server/store';
import createApp from './server/app';

const io = socketio();
const port = process.env.PORT || 8001;
const store = makeStore(io);
const app = createApp(io, port);

