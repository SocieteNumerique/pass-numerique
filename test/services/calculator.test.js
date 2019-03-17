import { expect } from 'chai';
import { Calculator } from '../../src/simulator/calculator';

describe('Calculator', () => {
    let calculator = new Calculator();

    let scenariosMatrix = {
        'intermunicipal rural': {
            input: {
                scale: Calculator.SCALE_INTERMUNICIPAL,
                population: 55391,
                density: 103,
                poverty: 0.139,
                previousBudget: 34027,
                isRural: true,
                isCityDistrict: false,
                isCityHeart: false,
                isOverseas: false,
                isMountain: false,
                hasNoHub: true,
                areOthersAssociated: true,
                hasEuFunds: true,
                isOfferIdentified: true,
            },
            expectedOutput: {
                stateRate: 0.7,
                stateAmount: 23819,
            },
        },

        'intermunicipal rural max amount': {
            input: {
                scale: Calculator.SCALE_INTERMUNICIPAL,
                population: 55391,
                density: 103,
                poverty: 0.139,
                previousBudget: 90000000,
                isRural: true,
                isCityDistrict: false,
                isCityHeart: false,
                isOverseas: false,
                isMountain: false,
                hasNoHub: true,
                areOthersAssociated: true,
                hasEuFunds: true,
                isOfferIdentified: true,
            },
            expectedOutput: {
                stateRate: 0.7,
                stateAmount: 1500000,
            },
        },
    };

    for (let number in scenariosMatrix) {
        const scenario = scenariosMatrix[number];
        const expected = scenario.expectedOutput;

        describe('Scenario '+number, () => {
            it('should return stateRate: '+expected.stateRate+', stateAmount: '+expected.stateAmount, () => {
                let output = calculator.compute(scenario.input);

                expect(output.stateRate).to.equal(expected.stateRate);
                expect(output.stateAmount).to.equal(expected.stateAmount);
            });
        });
    }
});
