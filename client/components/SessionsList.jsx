import React from 'react';
import _ from 'lodash';

import Session from './Session';


export default React.createClass({
    getSessions() {
        return _(_.values(this.props.sessions))
            .orderBy('timestamp')
            .reverse();
    },
    render() {
        return <div className={"container-fluid sessions"}>
            <div className={"row"}>
                <div className={"col-md-12"}>
                    <div className={"list-group"}>
                        {this.getSessions().map(s => {
                            console.log(s);
                            return <Session key={s.id} session={s}
                                {...this.props}/>;
                        }).value()}
                    </div>
                </div>
            </div>
        </div>
    }
});
