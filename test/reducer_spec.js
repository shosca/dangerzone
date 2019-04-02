import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';
import _ from 'lodash';

import reducer from '../common/reducer.js';
import * as actions from '../common/action_creators';

describe('Reducer', () => {

    describe('SET_STATE', () => {
        it('works', () => {
            const state = Map();
            const timestamp = new Date().getTime();
            const action = actions.setState({
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
                        },
                        '23452345': {
                            id: '23452345',
                            session: {
                                id: '1234',
                                name: '/url/1234/blah',
                            },
                            timestamp,
                            duration: 0.03,
                            text: 'SELECT * FROM someothertable WHERE id=?;',
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
                            count: 2,
                            duration: 0.04,
                            log: ['12341234', '23452345']
                        }
                    },
                    queries: {
                        'SELECT * FROM sometable WHERE id=?;': {
                            count: 1,
                            duration: 0.01,
                            log: ['12341234']
                        },
                        'SELECT * FROM someothertable WHERE id=?;': {
                            count: 1,
                            duration: 0.03,
                            log: ['23452345']
                        }
                    }
            });
            const nextState = reducer(state, action);
            expect(nextState).to.equal(fromJS({
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
                    },
                    '23452345': {
                        id: '23452345',
                        session: {
                            id: '1234',
                            name: '/url/1234/blah',
                        },
                        timestamp,
                        duration: 0.03,
                        text: 'SELECT * FROM someothertable WHERE id=?;',
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
                        count: 2,
                        duration: 0.04,
                        log: ['12341234', '23452345']
                    }
                },
                queries: {
                    'SELECT * FROM sometable WHERE id=?;': {
                        count: 1,
                        duration: 0.01,
                        log: ['12341234']
                    },
                    'SELECT * FROM someothertable WHERE id=?;': {
                        count: 1,
                        duration: 0.03,
                        log: ['23452345']
                    }
                }
            }));
        });
    });

    describe('ADD_ENTRY', () => {
        it('works on empty state', () => {
            const timestamp = new Date().getTime();
            const state = Map();
            const action = actions.addEntry({
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
            });
            const nextState = reducer(state, action);

            expect(fromJS(nextState.toJS())).to.equal(fromJS({
                log:{
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
                        timestamp,
                        name: '/url/1234/blah',
                        log:['12341234'],
                        count: 1,
                        duration: 0.01
                    }
                },
                queries: {
                    'SELECT * FROM sometable WHERE id=?;': {
                        name: 'SELECT * FROM sometable WHERE id=?;',
                        log:['12341234'],
                        count: 1,
                        duration: 0.01,
                        avg: 0.01,
                        min: 0.01,
                        max: 0.01
                    }
                }
            }));
        });

        it('works on existing state', () => {
            const timestamp = new Date().getTime();
            const state = fromJS({
                log:{
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
                        timestamp,
                        name: '/url/1234/blah',
                        log:['12341234'],
                        count: 1,
                        duration: 0.01
                    }
                },
                queries: {
                    'SELECT * FROM sometable WHERE id=?;': {
                        name: 'SELECT * FROM sometable WHERE id=?;',
                        log:['12341234'],
                        count: 1,
                        duration: 0.01,
                        avg: 0.01,
                        min: 0.01,
                        max: 0.01
                    }
                }
            });
            const action = actions.addEntry({
                id: '23452345',
                session: {
                    id: '1234',
                    name: '/url/1234/blah',
                },
                timestamp,
                duration: 0.02,
                text: 'SELECT * FROM someothertable WHERE id=?;',
                stack: [
                    {
                        file: '/some/file.py',
                        lineno: 456,
                        function: 'some_func',
                        line: 'query(SomeOtherthing).all()'
                    }
                ],
                parameters: [{ id: 1234 }]
            });

            const nextState = reducer(state, action);

            expect(fromJS(nextState.toJS())).to.equal(fromJS({
                log:{
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
                    },
                    '23452345': {
                        id: '23452345',
                        session: {
                            id: '1234',
                            name: '/url/1234/blah',
                        },
                        timestamp,
                        duration: 0.02,
                        text: 'SELECT * FROM someothertable WHERE id=?;',
                        stack: [
                            {
                                file: '/some/file.py',
                                lineno: 456,
                                function: 'some_func',
                                line: 'query(SomeOtherthing).all()'
                            }
                        ],
                        parameters: [{ id: 1234 }]
                    }
                },
                sessions: {
                    '1234': {
                        id: '1234',
                        timestamp,
                        name: '/url/1234/blah',
                        log:['12341234', '23452345'],
                        count: 2,
                        duration: 0.03
                    }
                },
                queries: {
                    'SELECT * FROM sometable WHERE id=?;': {
                        name: 'SELECT * FROM sometable WHERE id=?;',
                        log:['12341234'],
                        count: 1,
                        duration: 0.01,
                        avg: 0.01,
                        min: 0.01,
                        max: 0.01
                    },
                    'SELECT * FROM someothertable WHERE id=?;': {
                        name: 'SELECT * FROM someothertable WHERE id=?;',
                        log:['23452345'],
                        count: 1,
                        duration: 0.02,
                        avg: 0.02,
                        min: 0.02,
                        max: 0.02
                    }
                }
            }));

        });

        it('works on existing state with existing same query', () => {
            const timestamp = new Date().getTime();
            const state = fromJS({
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
                    },
                    '23452345': {
                        id: '23452345',
                        session: {
                            id: '1234',
                            name: '/url/1234/blah',
                        },
                        timestamp,
                        duration: 0.02,
                        text: 'SELECT * FROM someothertable WHERE id=?;',
                        stack: [
                            {
                                file: '/some/file.py',
                                lineno: 456,
                                function: 'some_func',
                                line: 'query(SomeOtherthing).all()'
                            }
                        ],
                        parameters: [{ id: 1234 }]
                    }
                },
                sessions: {
                    '1234': {
                        id: '1234',
                        timestamp,
                        name: '/url/1234/blah',
                        log:['12341234', '23452345'],
                        count: 2,
                        duration: 0.03
                    }
                },
                queries: {
                    'SELECT * FROM sometable WHERE id=?;': {
                        name: 'SELECT * FROM sometable WHERE id=?;',
                        log:['12341234'],
                        count: 1,
                        duration: 0.01,
                        avg: 0.01,
                        min: 0.01,
                        max: 0.01
                    },
                    'SELECT * FROM someothertable WHERE id=?;': {
                        name: 'SELECT * FROM someothertable WHERE id=?;',
                        log:['23452345'],
                        count: 1,
                        duration: 0.02,
                        avg: 0.02,
                        min: 0.02,
                        max: 0.02
                    }
                }
            });
            const action = actions.addEntry({
                id: '34563456',
                session: {
                    id: '1234',
                    name: '/url/1234/blah',
                },
                timestamp,
                duration: 0.02,
                text: 'SELECT * FROM someothertable WHERE id=?;',
                stack: [
                    {
                        file: '/some/file.py',
                        lineno: 456,
                        function: 'some_func',
                        line: 'query(SomeOtherthing).all()'
                    }
                ],
                parameters: [{ id: 1234 }]
            });
            const nextState = reducer(state, action);

            expect(fromJS(nextState.toJS())).to.equal(fromJS({
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
                    },
                    '23452345': {
                        id: '23452345',
                        session: {
                            id: '1234',
                            name: '/url/1234/blah',
                        },
                        timestamp,
                        duration: 0.02,
                        text: 'SELECT * FROM someothertable WHERE id=?;',
                        stack: [
                            {
                                file: '/some/file.py',
                                lineno: 456,
                                function: 'some_func',
                                line: 'query(SomeOtherthing).all()'
                            }
                        ],
                        parameters: [{ id: 1234 }]
                    },
                    '34563456': {
                        id: '34563456',
                        session: {
                            id: '1234',
                            name: '/url/1234/blah',
                        },
                        timestamp,
                        duration: 0.02,
                        text: 'SELECT * FROM someothertable WHERE id=?;',
                        stack: [
                            {
                                file: '/some/file.py',
                                lineno: 456,
                                function: 'some_func',
                                line: 'query(SomeOtherthing).all()'
                            }
                        ],
                        parameters: [{ id: 1234 }]
                    }
                },
                sessions: {
                    '1234': {
                        id: '1234',
                        timestamp,
                        name: '/url/1234/blah',
                        log:['12341234', '23452345', '34563456'],
                        count: 3,
                        duration: 0.05
                    }
                },
                queries: {
                    'SELECT * FROM sometable WHERE id=?;': {
                        name: 'SELECT * FROM sometable WHERE id=?;',
                        log:['12341234'],
                        count: 1,
                        duration: 0.01,
                        avg: 0.01,
                        min: 0.01,
                        max: 0.01
                    },
                    'SELECT * FROM someothertable WHERE id=?;': {
                        name: 'SELECT * FROM someothertable WHERE id=?;',
                        log:['23452345', '34563456'],
                        count: 2,
                        duration: 0.04,
                        avg: 0.02,
                        min: 0.02,
                        max: 0.02
                    }
                }
            }));
        });

    });

    describe('CLEAR', () => {
        it('works', () => {
            const timestamp = new Date().getTime();
            const state = fromJS({
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
                    },
                    '23452345': {
                        id: '23452345',
                        session: {
                            id: '1234',
                            name: '/url/1234/blah',
                        },
                        timestamp,
                        duration: 0.02,
                        text: 'SELECT * FROM someothertable WHERE id=?;',
                        stack: [
                            {
                                file: '/some/file.py',
                                lineno: 456,
                                function: 'some_func',
                                line: 'query(SomeOtherthing).all()'
                            }
                        ],
                        parameters: [{ id: 1234 }]
                    }
                },
                sessions: {
                    '1234': {
                        id: '1234',
                        timestamp,
                        name: '/url/1234/blah',
                        log:['12341234', '23452345'],
                        count: 2,
                        duration: 0.03
                    }
                },
                queries: {
                    'SELECT * FROM sometable WHERE id=?;': {
                        name: 'SELECT * FROM sometable WHERE id=?;',
                        log:['12341234'],
                        count: 1,
                        duration: 0.01
                    },
                    'SELECT * FROM someothertable WHERE id=?;': {
                        name: 'SELECT * FROM someothertable WHERE id=?;',
                        log:['23452345'],
                        count: 1,
                        duration: 0.02
                    }
                }
            });
            const action = actions.clear();
            const nextState = reducer(state, action);

            expect(nextState).to.equal(fromJS({
                log: {}, sessions: {}, queries: {}, selectedSession: null, selectedLog: null
            }));

        });
    });

    describe('SET_CONNECTION_STATE', () => {
        it('works', () => {
            const state = Map();
            const action = actions.setConnectionState(
                {state: 'connect', connected: true}
            );
            const nextState = reducer(state, action);
            expect(nextState).to.equal(fromJS({
                connection: {state: 'connect', connected: true}
            }));
        });
    });

    describe('SELECT_SESSION', () => {
        it('works', () => {
            const state = Map();
            const selectedSession = _.uniqueId();
            const action = actions.selectSession(selectedSession)
            const nextState = reducer(state, action);
            expect(nextState).to.equal(fromJS({
                selectedSession
            }));
        });
    });

    describe('SELECT_LOG', () => {
        it('works', () => {
            const state = Map();
            const selectedLog = _.uniqueId();
            const action = actions.selectLog(selectedLog)
            const nextState = reducer(state, action);
            expect(nextState).to.equal(fromJS({
                selectedLog
            }));
        });
    });

});
