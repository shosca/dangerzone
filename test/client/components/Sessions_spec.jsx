import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import util from 'util';
import _ from 'lodash';

import {Sessions} from '../../../client/components/Sessions';
import SplitPane from 'react-split-pane';

describe('Sessions component', () => {

    it('renders properly', () => {
        const renderer = TestUtils.createRenderer();
        const localStorage = {
            getItem() {}, setItem() { return 50 }
        }
        renderer.render(
            <Sessions localStorage={localStorage} />
        );
        const result = renderer.getRenderOutput();
        expect(result.type).to.equal(SplitPane);
        expect(result.props.split).to.equal('vertical');
        expect(result.props.allowResize).to.equal(true);
    });

});
