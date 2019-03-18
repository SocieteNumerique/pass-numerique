import { expect } from 'chai';
import { Calculator } from '../../src/simulator/calculator';

describe('Calculator', () => {
    const scenariosMatrix = {
        'intermunicipal rural': {
            input: {
                scale: Calculator.SCALE_INTERMUNICIPAL,
                population: 55391,
                density: 103,
                poverty: 0.14,
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
                poverty: 0.14,
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

        'departemental rural': {
            input: {
                scale: Calculator.SCALE_DEPARTMENTAL,
                population: 55391,
                density: 103,
                poverty: 0.14,
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
                stateRate: 0.9,
                stateAmount: 30624,
            },
        },

        'departemental city district': {
            input: {
                scale: Calculator.SCALE_DEPARTMENTAL,
                population: 55391,
                density: 103,
                poverty: 0.14,
                previousBudget: 34027,
                isRural: false,
                isCityDistrict: true,
                isCityHeart: false,
                isOverseas: false,
                isMountain: false,
                hasNoHub: false,
                areOthersAssociated: true,
                hasEuFunds: false,
                isOfferIdentified: false,
            },
            expectedOutput: {
                stateRate: 0.6,
                stateAmount: 20416,
            },
        },

        'interdepartemental city': {
            input: {
                scale: Calculator.SCALE_INTERDEPARTMENTAL,
                population: 55391,
                density: 103,
                poverty: 0.14,
                previousBudget: 34027,
                isRural: false,
                isCityDistrict: false,
                isCityHeart: true,
                isOverseas: false,
                isMountain: false,
                hasNoHub: false,
                areOthersAssociated: true,
                hasEuFunds: false,
                isOfferIdentified: false,
            },
            expectedOutput: {
                stateRate: 0.6,
                stateAmount: 20416,
            },
        },

        'regional mountain': {
            input: {
                scale: Calculator.SCALE_REGIONAL,
                population: 55391,
                density: 103,
                poverty: 0.14,
                previousBudget: 34027,
                isRural: false,
                isCityDistrict: false,
                isCityHeart: false,
                isOverseas: false,
                isMountain: true,
                hasNoHub: false,
                areOthersAssociated: false,
                hasEuFunds: false,
                isOfferIdentified: false,
            },
            expectedOutput: {
                stateRate: 0.2,
                stateAmount: 6805,
            },
        },

        'regional overseas': {
            input: {
                scale: Calculator.SCALE_REGIONAL,
                population: 7959137,
                density: 103,
                poverty: 0.2,
                previousBudget: 759027,
                isRural: false,
                isCityDistrict: false,
                isCityHeart: false,
                isOverseas: true,
                isMountain: false,
                hasNoHub: true,
                areOthersAssociated: true,
                hasEuFunds: true,
                isOfferIdentified: true,
            },
            expectedOutput: {
                stateRate: 1,
                stateAmount: 759027,
            },
        },

        'regional city heart light density': {
            input: {
                scale: Calculator.SCALE_REGIONAL,
                population: 7959137,
                density: 13,
                poverty: 0.2,
                previousBudget: 759027,
                isRural: false,
                isCityDistrict: false,
                isCityHeart: true,
                isOverseas: false,
                isMountain: false,
                hasNoHub: false,
                areOthersAssociated: false,
                hasEuFunds: false,
                isOfferIdentified: false,
            },
            expectedOutput: {
                stateRate: 0.8,
                stateAmount: 607222,
            },
        },
    };

    const calculator = new Calculator();

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
