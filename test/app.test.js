import { h, render } from 'preact';
import { expect } from 'chai';

import App from '../src/app';

describe('App', () => {
    let scratch;

    beforeAll(() => {
        scratch = document.createElement('div');
        (document.body || document.documentElement).appendChild(scratch);
    });

    beforeEach(() => {
        scratch.innerHTML = '';
    });

    afterAll(() => {
        scratch.parentNode.removeChild(scratch);
        scratch = null;
    });


    it('should render the app container', () => {
        render(<App />, scratch);

        expect(scratch.innerHTML).to.contain('<div class="content">');
    });
});
