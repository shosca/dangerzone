import io from 'socket.io-client';
import _ from 'lodash';
import Uid from 'sequential-guid';
import util from 'util';

const socket = io.connect('http://localhost:8001', { reconnect: true});
const uid = new Uid;

let stack = _.times(20, (i) => {
    return {
        file: 'some/file/' + _.random(1, 10000000),
        lineno: _.random(1, 200),
        'function': `some func_${_.random(1, 100)}()`,
        line: 'some line'
    }
});

_.times(3, (i) => {

    let sessions = _.times(4, (i) => {
        return {
            id: uid.next(),
            name: '/to/some/path/' + i
        }
    });

    _.times(50, () => {
        let action = {
            type: 'ADD_ENTRY',
            args: {
                id: uid.next(),
                session: sessions[_.random(0, sessions.length)],
                text: 'select col' + _.random(1, 10) + ' from something;',
                stack: _.times(_.random(1, 10), (s) => {
                    return stack[_.random(0, stack.length)]
                }),
                resultcount: _.random(1, 150),
                duration: _.random(0.001, 2.000),
                parameters: [{
                    test: '1234',
                    test2: '1234',
                    test3: '1234'
                }]
            }
        };
        socket.emit('action', action);
    });
});
