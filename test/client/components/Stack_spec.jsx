import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import {expect} from 'chai';
import util from 'util';
import _ from 'lodash';

import Stack from '../../../client/components/Stack';

const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
function randomString(length) {
	return _(_.times(length)).map(i => chars[i]).join('');
}

describe('Stack component', () => {
    it('renders correctly', () => {
        const s1 = {
            file: randomString(10),
            lineno: _.random(1, 200),
            function: randomString(10),
            line: randomString(10)
        }
        const s2 = {
            file: randomString(10),
            lineno: _.random(1, 200),
            function: randomString(10),
            line: randomString(10)
        }
        const renderer = TestUtils.createRenderer();
        renderer.render(<Stack stack={[s1, s2]} />);
        const stack = renderer.getRenderOutput();

        expect(stack.type).to.equal('ol');

        let li = stack.props.children[0];
        expect(li.type).to.equal('li');

        let p = li.props.children[0];
        expect(p.type).to.equal('p');
        expect(p.props.children.join()).to.equal(
             [s1.file, ':', s1.lineno].join()
        );

        p = li.props.children[1];
        expect(p.type).to.equal('p');
        expect(p.props.children.join()).to.equal(
             [s1.function, ': ', s1.line].join()
        );

        li = stack.props.children[1];
        expect(li.type).to.equal('li');

        p = li.props.children[0];
        expect(p.type).to.equal('p');
        expect(p.props.children.join()).to.equal(
             [s2.file, ':', s2.lineno].join()
        );

        p = li.props.children[1];
        expect(p.type).to.equal('p');
        expect(p.props.children.join()).to.equal(
             [s2.function, ': ', s2.line].join()
        );
    });
});
