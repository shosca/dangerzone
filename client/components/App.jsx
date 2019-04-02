import React from 'react';
import SplitPane from 'react-split-pane';
import {ConnectionStateContainer} from './ConnectionState';

import {HeaderContainer} from './Header';

export default React.createClass({
    render: function() {
        return <SplitPane className={"header"} split="horizontal" allowResize={false} defaultSize={48}>
            <HeaderContainer {...this.props} />
            <div>
                {this.props.children}
                <ConnectionStateContainer />
            </div>
        </SplitPane>;
    }
});

