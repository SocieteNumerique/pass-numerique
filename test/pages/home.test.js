import { h, render } from 'preact';
import { expect } from 'chai';

import Home from '../../src/pages/home';

describe('Home', () => {
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


    it('should render the initial form', () => {
        render(<Home />, scratch);

        expect(scratch.innerHTML).to.contain('Vais-je bénéficier des exonérations de la taxe d’habitation ?');
    });
});
