import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import util from 'util';
import _ from 'lodash';

import App from '../../../client/components/App';
import SplitPane from 'react-split-pane';

describe('App component', () => {

    it('renders correctly', () => {
        const renderer = TestUtils.createRenderer();
        renderer.render(<App />);
        const app = renderer.getRenderOutput();

        expect(app.type).to.equal(SplitPane);
        expect(app.props.className).to.equal('header');
        expect(app.props.split).to.equal('horizontal');
        expect(app.props.allowResize).to.equal(false);
        expect(app.props.defaultSize).to.equal(48);
    });

});
