import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import util from 'util';
import _ from 'lodash';

import Session from '../../../client/components/Session';

describe('Session component', () => {

    it('renders the session correctly', () => {
        const session = {
            id: _.uniqueId(),
            method: 'GET',
            name: '/to/some/path',
            count: 10,
            duration: 0.1234
        }
        const renderer = TestUtils.createRenderer();
        renderer.render(
            <Session session={session} />
        );
        const result = renderer.getRenderOutput();
        expect(result.type).to.equal('div');
        expect(result.props.className).to.equal('list-group-item');
        expect(result.props.children.type).to.equal('div');
        expect(result.props.children.props.className).to.equal('row-content');

        const heading = result.props.children.props.children[0];
        expect(heading.type).to.equal('p');
        expect(heading.props.className).to.equal('list-group-item-heading');
        expect(heading.props.children.join('')).to.equal(
            [session.method,': ', session.name].join('')
        );

        const subtext = result.props.children.props.children[1];
        expect(subtext.type).to.equal('p');
        expect(subtext.props.className).to.equal('list-group-item-text');
        expect(subtext.props.children.props.children.join(' '))
        .to.equal(
            [session.count, ' queries in ', session.duration.toFixed(3), ' secs.'].join(' ')
        );
    });

    it('marks selected session with active class', () => {
        const selectedSession = _.uniqueId();
        const session = {
            id: selectedSession,
            name: '/to/some/path',
            count: 10,
            duration: 0.1234
        }
        const renderer = TestUtils.createRenderer();
        renderer.render(
            <Session session={session} selectedSession={selectedSession} />
        );

        const result = renderer.getRenderOutput();
        expect(result.type).to.equal('div');
        expect(result.props.className).to.equal('list-group-item active');
    });

    it('invokes callback when click clicked', () => {
        var selectedSession = null;
        const session = {
            id: _.uniqueId(),
            name: '/to/some/path',
            count: 10,
            duration: 0.1234
        };
        const selectSession = (id) => { selectedSession = id };

        const renderer = TestUtils.createRenderer();
        renderer.render(
            <Session session={session} selectSession={selectSession}/>
        );

        const result = renderer.getRenderOutput();
        result.props.onClick();
        expect(selectedSession).to.not.be.null;
        expect(selectedSession).to.equal(session.id);
    });
});
