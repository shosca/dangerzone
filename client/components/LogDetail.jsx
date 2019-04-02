import React from 'react';
import util from 'util';
import SplitPane from 'react-split-pane';
import _ from 'lodash';

import Highlight from './Highlight';
import Parameters from './Parameters';
import Stack from './Stack';

export default React.createClass({
    getInitialState() {
        return { showquery: true }
    },
    onTabClick(showquery) {
        this.setState({ showquery });
        return false;
    },
    render() {
        let entry = this.props.entry
        let queryclass = this.state.showquery ? " active" : "";
        let traceclass = this.state.showquery ? "" : " active";
        return <SplitPane className={"logdetail"} split="horizontal" allowResize={false} defaultSize={37}>
            <ul className={"nav nav-pills"} role="tablist">
                <li role="presentation">
                    <a href="#query" className={queryclass} onClick={() => this.onTabClick(true)} role="tab">Query</a>
                </li>
                <li role="presentation">
                    <a href="#trace" className={traceclass} onClick={() => this.onTabClick(false)} role="tab">Stack Trace</a>
                </li>
            </ul>
            <div className={"tab-content"}>
                <div role="tab-panel" className={"tab-pane"+queryclass}>
                    <div className="container-fluid">
                        <div className="row">
                            <Highlight className={"sql"}>
                                {this.props.entry.text}
                            </Highlight>
                        </div>
                        <div className="row">
                            <Parameters id={entry.id} parameters={entry.parameters} />
                        </div>
                    </div>
                </div>
                <div role="tab-panel" className={"tab-pane"+traceclass}>
                    <Stack id={entry.id} stack={entry.stack} />
                </div>
            </div>
        </SplitPane>;
    }
})
