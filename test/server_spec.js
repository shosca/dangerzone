import {Map, List, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../common/reducer';
import {addEntry} from '../common/action_creators';
import makeStore from '../server/store';

describe('Server', () => {

    describe('store', () => {

        it('is a Redux store correctly configured with the reducer', () => {
            const mock_socket = { emit() {}, on() {}, sockets:{ emit() {}  } }; // mock socket.io
            const store = makeStore(mock_socket);
            const timestamp = new Date().getTime();
            expect(store.getState()).to.equal(Map());

            store.dispatch(addEntry({
                id: '12341234',
                session: {
                    id: '1234',
                    name: '/url/1234/blah',
                },
                timestamp,
                duration: 0.01,
                text: 'SELECT * FROM sometable WHERE id=?;',
                stack: [{
                        file: '/some/file.py',
                        lineno: 123,
                        function: 'some_func',
                        line: 'query(Something).all()'
                }],
                parameters: [{ id: 1234 }]
            }));

            expect(fromJS(store.getState().toJS())).to.equal(fromJS({
                log: {
                    '12341234': {
                        id: '12341234',
                        session: {
                            id: '1234',
                            name: '/url/1234/blah',
                        },
                        timestamp,
                        duration: 0.01,
                        text: 'SELECT * FROM sometable WHERE id=?;',
                        stack: [
                            {
                                file: '/some/file.py',
                                lineno: 123,
                                function: 'some_func',
                                line: 'query(Something).all()'
                            }
                        ],
                        parameters: [{ id: 1234 }]
                    }
                },
                sessions: {
                    '1234': {
                        id: '1234',
                        name: '/url/1234/blah',
                        timestamp,
                        log:['12341234'],
                        count: 1,
                        duration: 0.01
                    }
                },
                queries: {
                    'SELECT * FROM sometable WHERE id=?;': {
                        name: 'SELECT * FROM sometable WHERE id=?;',
                        count: 1,
                        duration: 0.01,
                        avg: 0.01,
                        min: 0.01,
                        max: 0.01,
                        log:['12341234']
                    }
                }
            }));

        });
    });

});
