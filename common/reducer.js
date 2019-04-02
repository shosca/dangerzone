import {List, Map, fromJS} from 'immutable';
import util from 'util';
import _ from 'lodash';

const emptySession = {
    id: _.uniqueId(),
    timestamp: Number.MAX_VALUE,
    name: "No Session"
};

const registry = {
    'SET_STATE': function(state, fargs) {
        return state.merge(fargs);
    },
    'ADD_ENTRY': function(state, fargs) {
        if (!fargs.timestamp)
            fargs.timestamp = new Date().getTime();

        if (!fargs.session)
            fargs.session = emptySession;

        return state.withMutations(
            newState => newState
                .setIn(
                    ['log', fargs.id], fargs
                )
                .updateIn(
                    ['sessions', fargs.session.id],
                    Map(_.assign({
                        timestamp: fargs.timestamp,
                        count: 0,
                        duration: 0,
                        log: List()
                    }, fargs.session)),
                    m => m.update('count', 0, c => c + 1)
                          .update('duration', 0, d =>  d + fargs.duration)
                          .update('log', x => x.push(fargs.id))
                )
                .updateIn(
                    ['queries', fargs.text],
                    Map({
                        name: fargs.text,
                        count: 0,
                        duration: 0,
                        avg: 0,
                        min: null,
                        max: null,
                        log: List()
                    }),
                    m => {
                        let q = m.toJS();
                        q.count++;
                        q.duration += fargs.duration;
                        q.avg = q.duration/q.count;
                        q.min = q.min ? Math.min(q.min, fargs.duration) : fargs.duration;
                        q.max = q.max ? Math.max(q.max, fargs.duration) : fargs.duration;
                        q.log.push(fargs.id);
                        return m.merge(q);
                    }
                )
        )
    },
    'CLEAR': function(state) {
        return state.withMutations(
            newState => newState
                .set('selectedSession', null)
                .set('selectedLog', null)
                .set('log', state.get('log', Map()).clear())
                .set('sessions', state.get('sessions', Map()).clear())
                .set('queries', state.get('queries', Map()).clear())
        );
    },
    'SET_CONNECTION_STATE': function(state, fargs) {
        return state.set('connection', fromJS(fargs));
    },
    'SELECT_SESSION': function(state, fargs) {
        return state.set('selectedSession', fargs);
    },
    'SELECT_LOG': function(state, fargs) {
        return state.set('selectedLog', fargs);
    }
};

export default function reducer(state = Map(), action) {
    if (registry[action.type]) {
        return registry[action.type](state, action.args);
    }
    return state;
}
