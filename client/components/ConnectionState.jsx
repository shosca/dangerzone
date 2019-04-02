import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {Notification} from 'react-notification';
import {Map} from 'immutable';

export const ConnectionState = React.createClass({
    mixins:[PureRenderMixin],
    isVisible() {
        return !this.props.connected;
    },
    getMessage() {
        return `Not connected (${this.props.state})`;
    },
    render() {
        return <Notification
            isActive={this.isVisible()}
            message={this.getMessage()}
        />
    }
})

export const ConnectionStateContainer = connect(
    state => state.get('connection', Map()).toJS()
)(ConnectionState);
