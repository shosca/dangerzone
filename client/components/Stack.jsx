import React from 'react';

export default React.createClass({
    getStack() {
        return this.props.stack || [];
    },
    render() {
        return <ol>
            {this.getStack().map((stack, i) => {
                return <li key={this.props.id+"."+i}>
                    <p>
                        {stack.file}:{stack.lineno}
                    </p>
                    <p>
                        {stack.function}: {stack.line}
                    </p>
                </li>;
            })}
        </ol>
    }
});
