import { h, render } from 'preact';
import { expect } from 'chai';

import Exoneration from '../../src/pages/exoneration';

describe('Exoneration', () => {
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
        render(<Exoneration />, scratch);

        expect(scratch.innerHTML).to.contain('Vous bénéficierez d\'une baisse de votre taxe d’habitation dès l\'année prochaine.');
    });
});
