import util from 'util';
import _ from 'lodash';

var printed = false;

export default io => store => next => action => {
    if (action.type !== 'CLEAR')
        io.sockets.emit('action', action);


    return next(action);
};
