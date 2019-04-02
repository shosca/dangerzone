import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import util from 'util';
import _ from 'lodash';

import {Header} from '../../../client/components/Header';

describe('Header component', () => {
    it('renders correctly', () => {
        const renderer = TestUtils.createRenderer();
        renderer.render(<Header />);
        const result = renderer.getRenderOutput();

        expect(result.type).to.equal('div');
        expect(result.props.className).to.equal('navbar navbar-default navbar-fixed-top');

        let container = result.props.children;
        expect(container.type).to.equal('div');
        expect(container.props.className).to.equal('container-fluid');

        let leftnavbar = container.props.children[0];
        expect(leftnavbar.type).to.equal('ul');
        expect(leftnavbar.props.className).to.equal('nav navbar-nav');

        let rootlink = leftnavbar.props.children[0];
        expect(rootlink.type).to.equal('li');
        expect(rootlink.props.children.type.displayName).to.equal('Link');
        expect(rootlink.props.children.props.to).to.equal('/');


        let querieslink = leftnavbar.props.children[1];
        expect(querieslink.type).to.equal('li');
        expect(querieslink.props.children.type.displayName).to.equal('Link');
        expect(querieslink.props.children.props.to).to.equal('/queries');


        let rightnavbar = container.props.children[1];
        expect(rightnavbar.type).to.equal('ul');
        expect(rightnavbar.props.className).to.equal('nav navbar-nav pull-right');

        let clearlink = rightnavbar.props.children;
        expect(clearlink.type).to.equal('li');
        expect(clearlink.props.children.type).to.equal('a');
    });

    it('clear link works', () => {
        var clickresult = 0;
        function clear() { clickresult = 1; }

        const renderer = TestUtils.createRenderer();
        renderer.render(<Header clear={clear} />);
        const result = renderer.getRenderOutput();

        let link = result.props.children.props.children[1].props.children.props.children;
        expect(link.props.onClick).to.equal(clear);
        link.props.onClick();
        expect(clickresult).to.equal(1);
    });
});
