import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import util from 'util';
import _ from 'lodash';

import SessionsList from '../../../client/components/SessionsList';

describe('SessionsList component', () => {

    it('renders a list of sessions', () => {
        const s1 = {
            id: _.uniqueId(),
            timestamp: new Date().getTime(),
            name: '/to/some/path' + _.uniqueId(),
            count: Math.floor(Math.random()*10),
            duration: Math.random()
        };
        const s2 = {
            id: _.uniqueId(),
            timestamp: new Date().getTime(),
            name: '/to/some/path' + _.uniqueId(),
            count: Math.floor(Math.random()*10),
            duration: Math.random()

        };

        const renderer = TestUtils.createRenderer();
        renderer.render(
            <SessionsList sessions={[s1, s2]} />
        );
        const result = renderer.getRenderOutput();
        expect(result.type).to.equal('div');
        expect(result.props.className).to.equal('container-fluid sessions');

        let row = result.props.children;
        expect(row.type).to.equal('div');
        expect(row.props.className).to.equal('row');

        let col = row.props.children;
        expect(col.type).to.equal('div');
        expect(col.props.className).to.equal('col-md-12');

        let list = col.props.children;
        expect(list.props.className).to.equal('list-group');
        expect(list.props.children[0].type.displayName).to.equal('Session');
        expect(list.props.children[1].type.displayName).to.equal('Session');
    });

});
