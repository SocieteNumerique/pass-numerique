import { h, render } from 'preact';
import { expect } from 'chai';

import NoExoneration from '../../src/pages/no-exoneration';

describe('NoExoneration', () => {
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
        render(<NoExoneration />, scratch);

        expect(scratch.innerHTML).to.contain('Vous ne bénéficiez pas de l\'exonération<br>en 2018');
    });
});
