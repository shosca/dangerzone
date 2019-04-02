import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import util from 'util';
import _ from 'lodash';

import {ConnectionState} from '../../../client/components/ConnectionState';
import {Notification} from 'react-notification';

describe('ConnectionState component', () => {

    it('renders correctly', () => {
        const renderer = TestUtils.createRenderer();
        renderer.render(<ConnectionState connected={true} />);
        const connectionstate = renderer.getRenderOutput();

        expect(connectionstate.type).to.equal(Notification);
        expect(connectionstate.props.isActive).to.equal(false);
    });

    it('is visible when disconnected', () => {
        const renderer = TestUtils.createRenderer();
        renderer.render(<ConnectionState connected={false} state={"Disconnected"} />);
        const connectionstate = renderer.getRenderOutput();

        expect(connectionstate.type).to.equal(Notification);
        expect(connectionstate.props.isActive).to.equal(true);
        expect(connectionstate.props.message).to.equal('Not connected (Disconnected)');
    });
});
