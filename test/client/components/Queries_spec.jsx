import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import util from 'util';
import _ from 'lodash';

import {Queries} from '../../../client/components/Queries';


describe('Queries component', () => {

    it('renders correctly', () => {
        const q1 = {
            name: 'select * from table1;',
            count: 2,
            duration: Math.random(),
            avg: Math.random(),
            min: Math.random(),
            max: Math.random()
        }
        const data = {};
        data[q1.name] = q1;

        const renderer = TestUtils.createRenderer();
        renderer.render(<Queries queries={data} />);
        const queries = renderer.getRenderOutput();

        expect(queries.type).to.equal('div');
        expect(queries.props.className).to.equal('container-fluid');

        let row = queries.props.children;
        expect(row.type).to.equal('div');
        expect(row.props.className).to.equal('row');

        let col = row.props.children;
        expect(col.type).to.equal('div');
        expect(col.props.className).to.equal('col-sm-12');

        let table = col.props.children;
        expect(table.type).to.equal('table');
        expect(table.props.className).to.equal('table table-striped table-hover');

        let thead = table.props.children[0];
        expect(thead.type).to.equal('thead');

        let tr = thead.props.children;
        expect(tr.type).to.equal('tr');
        expect(tr.props.children[0].type).to.equal('th');
        expect(tr.props.children[0].props.children).to.equal('Query');
        expect(tr.props.children[1].type).to.equal('th');
        expect(tr.props.children[1].props.children).to.equal('Count');
        expect(tr.props.children[2].type).to.equal('th');
        expect(tr.props.children[2].props.children).to.equal('Total Duration');
        expect(tr.props.children[3].type).to.equal('th');
        expect(tr.props.children[3].props.children).to.equal('Average');
        expect(tr.props.children[4].type).to.equal('th');
        expect(tr.props.children[4].props.children).to.equal('Min');
        expect(tr.props.children[5].type).to.equal('th');
        expect(tr.props.children[5].props.children).to.equal('Max');

        let tbody = table.props.children[1];
        expect(tbody.type).to.equal('tbody');
        tr = tbody.props.children[0];
        expect(tr.type).to.equal('tr');
        expect(tr.props.children[0].type).to.equal('td');
        expect(tr.props.children[1].type).to.equal('td');
        expect(tr.props.children[1].props.children).to.equal(q1.count);
        expect(tr.props.children[2].type).to.equal('td');
        expect(tr.props.children[2].props.children).to.equal(q1.duration.toFixed(4));
        expect(tr.props.children[3].type).to.equal('td');
        expect(tr.props.children[3].props.children).to.equal((q1.avg).toFixed(4));
        expect(tr.props.children[4].type).to.equal('td');
        expect(tr.props.children[4].props.children).to.equal((q1.min).toFixed(4));
        expect(tr.props.children[5].type).to.equal('td');
        expect(tr.props.children[5].props.children).to.equal((q1.max).toFixed(4));
    });

});
