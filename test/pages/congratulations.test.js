import { h, render } from 'preact';
import { expect } from 'chai';

import Congratulations from '../../src/pages/congratulations';

describe('Congratulations', () => {
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


    it('should render the page', () => {
        render(<Congratulations />, scratch);

        expect(scratch.innerHTML).to.contain('Félicitations !');
    });
});
