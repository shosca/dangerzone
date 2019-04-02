import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import util from 'util';
import _ from 'lodash';

import SplitPane from 'react-split-pane';
import ReactList from 'react-list';
import Logs from '../../../client/components/Logs';

describe('Logs component', () => {

    it('renders correctly', () => {
        const renderer = TestUtils.createRenderer();
        renderer.render(<Logs />);
        const result = renderer.getRenderOutput();

        expect(result.type).to.equal(SplitPane);
        expect(result.props.defaultSize).to.equal(75);
        expect(result.props.split).to.equal('horizontal');
        expect(result.props.allowResize).to.equal(false);

        let header = result.props.children[0];
        expect(header.type).to.equal('div');
        expect(header.props.className).to.equal('logs-header');

        let navbar = header.props.children[0];
        expect(navbar.type).to.equal('div');
        expect(navbar.props.className).to.equal('navbar');

        let leftnav = navbar.props.children[0];
        expect(leftnav.type).to.equal('ul');
        expect(leftnav.props.className).to.equal('nav navbar-nav');
        expect(leftnav.props.children.type).to.equal('li');
        expect(leftnav.props.children.props.children.type).to.equal('h4');

        let rightnav = navbar.props.children[1];
        expect(rightnav.type).to.equal('ul');
        expect(rightnav.props.className).to.equal('nav navbar-nav pull-right');
        expect(rightnav.props.children.type).to.equal('li');
        expect(rightnav.props.children.props.children.type).to.equal('a');

        let row = header.props.children[1];
        expect(row.type).to.equal('div');
        expect(row.props.children[0].type).to.equal('div');
        expect(row.props.children[1].type).to.equal('div');
        expect(row.props.children[2].type).to.equal('div');

        let list = result.props.children[1]
        expect(list.type).to.equal('div');
        expect(list.props.className).to.equal('logs-list');
        expect(list.props.children.type).to.equal(ReactList);
    });

});
