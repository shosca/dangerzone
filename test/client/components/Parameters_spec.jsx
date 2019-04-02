import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import util from 'util';
import _ from 'lodash';

import Parameters from '../../../client/components/Parameters';

describe('Parameters component', () => {
    it('renders correctly', () => {
        const renderer = TestUtils.createRenderer();
        renderer.render(<Parameters parameters={[{ key1: 'val1' }]} />);
        const params = renderer.getRenderOutput();

        expect(params.type).to.equal('table');
        expect(params.props.className).to.equal('table table-striped');

        let thead = params.props.children[0];
        expect(thead.type).to.equal('thead');
        let tr = thead.props.children;
        expect(tr.type).to.equal('tr');
        expect(tr.props.children[0].type).to.equal('th');
        expect(tr.props.children[0].props.children).to.equal('Parameter');
        expect(tr.props.children[1].type).to.equal('th');
        expect(tr.props.children[1].props.children).to.equal('Value');

        let tbody = params.props.children[1];
        expect(tbody.type).to.equal('tbody');
        tr = tbody.props.children[0];
        expect(tr.type).to.equal('tr');
        expect(tr.props.children[0].type).to.equal('td');
        expect(tr.props.children[1].type).to.equal('td');
    });
});
