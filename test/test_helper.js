import jsdom from 'jsdom';
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

const doc = jsdom.jsdom('<!doctype><html><body></body></html>');
const win = doc.defaultView;
win.getComputedStyle = (doc) => {
    return ["-moz-color", "-moz-background-color"];
};
global.document = doc;
global.window = win;
propagateToGlobal(win);

function propagateToGlobal(window) {
    for (let key in window) {
        if (!window.hasOwnProperty(key)) continue;
        if (key in global) continue;

        global[key] = window[key];
    }
}


chai.use(chaiImmutable);
