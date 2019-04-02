import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {Map} from 'immutable';
import _ from 'lodash';
import util from 'util';

import Log from './Log';
import SplitPane from 'react-split-pane';
import ReactList from 'react-list';

export default React.createClass({
    getSession() {
        if (this.props.selectedSession && this.props.sessions[this.props.selectedSession]) {
            return this.props.sessions[this.props.selectedSession];
        }
        return null;
    },
    getLogs() {
        let session = this.getSession();
        if (session) {
            return _(session.log).map(k => this.props.log[k])
                    .orderBy('timestamp').reverse().value();
        }
        return _(this.props.log).values().orderBy('timestamp').reverse().value();
    },
    handleDownload(){
        let blob = new Blob(
            [JSON.stringify(this.getLogs() || [])], {
                type: 'text/json;charset=utf-8'
            }
        );

        let element = document.createElement('a');
        document.body.appendChild(element);
        element.setAttribute('href', window.URL.createObjectURL(blob));
        let session = this.getSession();
        let filename = session ? session.name
            : 'log';
        element.setAttribute('download', `${filename}.json`);
        element.style.display = '';
        element.click();
        document.body.removeChild(element);
        event.stopPropagation();
    },
    render() {
        let session = this.getSession();
        let logs = this.getLogs();
        let selectedLog = this.props.selectedLog;
        let selectLog = this.props.selectLog;

        const renderItem = (index, key) => {
            let log = logs[index];
            return <Log key={log.id} entry={log}
                selectedLog={selectedLog}
                selectLog={selectLog} />;
        };

        return <SplitPane defaultSize={75} split="horizontal" allowResize={false}>
            <div className={"logs-header"} style={{width: '100%'}}>
                <div className={"navbar"}>
                    <ul className={"nav navbar-nav"}>
                        <li>
                            <h4>
                                {session && session.method ? `${session.method}: ` : ''}
                                {session ? session.name : "All Sessions"} <br />
                                <small>
                                    {session ? ` ${session.count} queries in ${session.duration.toFixed(3)} secs.` : ""}
                                </small>
                            </h4>
                        </li>
                    </ul>
                    <ul className={"nav navbar-nav pull-right"}>
                        <li>
                            <a href="javascript:void(0);" onClick={this.handleDownload}>
                                <span className={"glyphicon glyphicon-download"} aria-hidden="true"></span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={"row"} style={{width: '100%'}}>
                    <div className={"col-md-10"}>
                        <strong>Query</strong>
                    </div>
                    <div className={"col-md-1"}>
                        <strong>Duration</strong>
                    </div>
                    <div className={"col-md-1"}>
                        <strong>Count</strong>
                    </div>
                </div>
            </div>
            <div className={"logs-list"}>
                <ReactList
                    itemRenderer={renderItem}
                    length={logs.length}
                    type='variable'
                />
            </div>
        </SplitPane>;
    }
});
