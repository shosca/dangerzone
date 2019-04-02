import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import util from 'util';
import _ from 'lodash';

import Highlight from '../../../client/components/Highlight';
import Parameters from '../../../client/components/Parameters';
import Stack from '../../../client/components/Stack';
import LogDetail from '../../../client/components/LogDetail';
import SplitPane from 'react-split-pane';

describe('LogDetail component', () => {

    it('renders correctly', () => {
        const stack1 = {
            file: 'some/file/1',
            lineno: 1,
            'function': 'some func()',
            line: 'some line'
        };
        const stack2 = {
            file: 'some/file/2',
            lineno: 2,
            'function': 'some func()',
            line: 'some line'
        };
        const entry = {
            id: _.uniqueId(),
            text: "some query",
            duration: Math.random(),
            resultcount: 1,
            parameters: [{
                param1: 1, param2: 2
            }],
            stack: [stack1, stack2]
        };
        const renderer = TestUtils.createRenderer();
        renderer.render(<LogDetail entry={entry} />);
        const logdetail = renderer.getRenderOutput();

        expect(logdetail.type).to.equal(SplitPane);
        expect(logdetail.props.className).to.equal('logdetail');
        expect(logdetail.props.split).to.equal('horizontal');
        expect(logdetail.props.allowResize).to.equal(false);
        expect(logdetail.props.defaultSize).to.equal(37);

        let nav = logdetail.props.children[0];
        expect(nav.type).to.equal('ul');
        expect(nav.props.className).to.equal('nav nav-pills');
        expect(nav.props.children[0].type).to.equal('li');
        expect(nav.props.children[0].props.children.type).to.equal('a');
        expect(nav.props.children[0].props.children.props.children).to.equal('Query');

        expect(nav.props.children[1].type).to.equal('li');
        expect(nav.props.children[1].props.children.type).to.equal('a');
        expect(nav.props.children[1].props.children.props.children).to.equal('Stack Trace');

        let tabcontent = logdetail.props.children[1];
        expect(tabcontent.type).to.equal('div');
        expect(tabcontent.props.className).to.equal('tab-content');

        let querypane = tabcontent.props.children[0];
        expect(querypane.type).to.equal('div');
        expect(querypane.props.className).to.equal('tab-pane active');

        let querycontainer = querypane.props.children;
        expect(querycontainer.type).to.equal('div');
        expect(querycontainer.props.className).to.equal('container-fluid');

        let queryrow = querycontainer.props.children[0];
        expect(queryrow.type).to.equal('div');
        expect(queryrow.props.className).to.equal('row');

        let hilight = queryrow.props.children;
        expect(hilight.type).to.equal(Highlight);
        expect(hilight.props.className).to.equal('sql');

        queryrow = querycontainer.props.children[1];
        expect(queryrow.type).to.equal('div');
        expect(queryrow.props.className).to.equal('row');

        let params = queryrow.props.children;
        expect(params.type).to.equal(Parameters);

        let stackpane = tabcontent.props.children[1];
        expect(stackpane.type).to.equal('div');
        expect(stackpane.props.className).to.equal('tab-pane');
        expect(stackpane.props.children.type).to.equal(Stack);
    });

});
