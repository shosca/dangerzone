import React from 'react';
import util from 'util';
import _ from 'lodash';

export default React.createClass({
    getParameters() {
        return this.props.parameters || [];
    },
    render() {
        return <table className={"table table-striped"}>
            <thead>
                <tr>
                    <th>Parameter</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                {_(this.getParameters()).map(params => {
                    return _.map(params, (v, k) => {
                        return <tr key={this.props.id+'.'+_.uniqueId()}>
                            <td>{k}</td>
                            <td>{util.inspect(v)}</td>
                        </tr>;
                    })
                }).flatten().value()}
            </tbody>
        </table>
    }
});
