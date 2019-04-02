import React from 'react';
import {connect} from 'react-redux';
import SplitPane from 'react-split-pane';
import {Map} from 'immutable';
import _ from 'lodash';

import Logs from './Logs';
import LogDetail from './LogDetail';
import SessionsList from './SessionsList';

import * as actionCreators from '../../common/action_creators';

export const Sessions = React.createClass({
    getDetailSize(size) {
        size && this.props.localStorage.setItem('detailsize', size);
        return this.props.localStorage.getItem('detailsize') || 350;
    },
    getSessionSize(size) {
        size && this.props.localStorage.setItem('sessionssize', size);
        return this.props.localStorage.getItem('sessionssize') || 350;
    },
    render() {
        return <SplitPane split="vertical"
            defaultSize={this.getSessionSize()}
            onChange={this.getSessionSize}
            minSize={50}>
            <SessionsList {...this.props} />
            {this.props.selectedLog
                ? <SplitPane split="horizontal"
                    defaultSize={this.getDetailSize()}
                    onChange={this.getDetailSize}
                    primary="second">
                    <Logs {...this.props} />
                    <LogDetail entry={this.props.log[this.props.selectedLog]} />
                </SplitPane>
                : <Logs {...this.props} />

            }
        </SplitPane>;
    }
});

export const SessionsContainer = connect(
    (state) => {
        return {
            sessions: state.get('sessions', Map()).toJS(),
            log: state.get('log', Map()).toJS(),
            selectedSession: state.get('selectedSession', null),
            selectedLog: state.get('selectedLog', null),
            localStorage: window.localStorage
        };
    },
    actionCreators
)(Sessions);

