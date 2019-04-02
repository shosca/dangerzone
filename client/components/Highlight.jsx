import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import hljs from 'highlight.js';

export default React.createClass({
    componentDidMount() {
        let node = ReactDOM.findDOMNode(this);
        _(node.querySelectorAll('pre code')).forEach(hljs.highlightBlock);
    },
    componentDidUpdate() {
        this.componentDidMount();
    },
    render() {
        return <pre>
            <code className={this.props.className}>
                {this.props.children}
            </code>
        </pre>
    }
});
