import React from 'react';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import _ from 'lodash';
import util from 'util';

import Highlight from './Highlight';
import * as actionCreators from '../../common/action_creators';


export const Queries = React.createClass({
    getInitialState() {
        return { orderBy: "duration" }
    },
    getQueries() {
        return _(_.values(this.props.queries))
               .orderBy(this.state.orderBy)
               .reverse();
    },
    orderBy(attr) {
        let orderBy;
        if (attr === 'avgduration') {
            orderBy = (a) => a.duration/a.count;
        } else {
            orderBy = attr;
        }
        this.setState({ orderBy });
    },
    render() {
        return <div className={"container-fluid"}>
            <div className={"row"}>
                <div className={'col-sm-12'}>
                    <table className={"table table-striped table-hover"}>
                        <thead>
                            <tr>
                                <th onClick={() => this.orderBy("name")}>Query</th>
                                <th onClick={() => this.orderBy("count")}>Count</th>
                                <th onClick={() => this.orderBy("duration")}>Total Duration</th>
                                <th onClick={() => this.orderBy("avg")}>Average</th>
                                <th onClick={() => this.orderBy("min")}>Min</th>
                                <th onClick={() => this.orderBy("max")}>Max</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.getQueries().map(q => {
                                return <tr key={q.name}>
                                    <td>
                                        <Highlight className={'sql'}>
                                            {q.name.replace(/(?:\r\n|\r|\n)/g, ' ')
                                                .replace(/(SELECT)(.+?)(?= FROM)/gi, "$1 …")
                                                .replace(/(JOIN(.+?)ON)(.+?)(LEFT|OUTER|JOIN|WHERE)/gi, "$1 … $4")
                                            }
                                        </Highlight>
                                    </td>
                                    <td>
                                        {q.count}
                                    </td>
                                    <td>
                                        {q.duration.toFixed(4)}
                                    </td>
                                    <td>
                                        {q.avg.toFixed(4) }
                                    </td>
                                    <td>
                                        {q.min.toFixed(4) }
                                    </td>
                                    <td>
                                        {q.max.toFixed(4) }
                                    </td>
                                </tr>;
                            }).value()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>;
    }
});

export const QueriesContainer = connect(
    (state) => {
        return {
            queries: state.get('queries', Map()).toJS()
        };
    },
    actionCreators
)(Queries);

