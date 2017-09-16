import { h, render } from 'preact';
import { expect } from 'chai';

import Result from '../../src/pages/result';

describe('Result', () => {
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
        render(<Result />, scratch);

        expect(scratch.innerHTML).to.contain('Ma taxe d’habitation sera de');
    });
});
