import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import util from 'util';
import _ from 'lodash';

import Log from '../../../client/components/Log';

describe('Log component', () => {

    it('renders correctly', () => {
        const log = {
            id: _.uniqueId(),
            text: "some query",
            duration: Math.random(),
            resultcount: 1
        };
        const renderer = TestUtils.createRenderer();
        renderer.render(<Log entry={log} />);
        const result = renderer.getRenderOutput();

        expect(result.type).to.equal('div');
        expect(result.props.className).to.equal('row log-item');
        expect(result.props.children[0].type).to.equal('div');
        expect(result.props.children[0].props.children).to.equal(log.text);

        expect(result.props.children[1].type).to.equal('div');
        expect(result.props.children[1].props.children).to.equal(log.duration.toFixed(4));

        expect(result.props.children[2].type).to.equal('div');
        expect(result.props.children[2].props.children).to.equal(1);
    });

    it('invokes callback when click clicked', () => {
        let selectedLog = null;
        const log = {
            id: _.uniqueId(),
            text: "some query",
            duration: Math.random(),
            resultcount: 1
        };
        const selectLog = (id) => { selectedLog = id; }

        const renderer = TestUtils.createRenderer();
        renderer.render(<Log entry={log} selectLog={selectLog} />);
        const result = renderer.getRenderOutput();
        result.props.onClick();
        expect(selectedLog).to.not.be.null;
        expect(selectedLog).to.equal(log.id);
    });

});
