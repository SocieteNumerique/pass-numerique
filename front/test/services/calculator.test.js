import { expect } from 'chai';
import { Calculator } from '../../src/simulator/calculator';

describe('Calculator', () => {
    const scenariosMatrix = {
        'intermunicipal': {
            input: {
                scale: Calculator.SCALE_INTERMUNICIPAL,
                population: 55391,
                density: 103,
                poverty: 0.14,
                previousBudget: 34027,
                isTargetPublic: true,
                hasOrganizedLocally: false,
                hasHub: false,
                areOthersAssociated: false,
                hasEuFunds: false,
            },
            expectedOutput: {
                stateRate: 0.2,
                stateAmount: 8507,
            },
        },

        'intermunicipal organized locally': {
            input: {
                scale: Calculator.SCALE_INTERMUNICIPAL,
                population: 55391,
                density: 103,
                poverty: 0.14,
                previousBudget: 34027,
                isTargetPublic: true,
                hasOrganizedLocally: true,
                hasHub: false,
                areOthersAssociated: false,
                hasEuFunds: false,
            },
            expectedOutput: {
                stateRate: 0.35,
                stateAmount: 18322,
            },
        },

        'intermunicipal wrong public': {
            input: {
                scale: Calculator.SCALE_INTERMUNICIPAL,
                population: 55391,
                density: 103,
                poverty: 0.14,
                previousBudget: 34027,
                isTargetPublic: false,
                hasOrganizedLocally: false,
                hasHub: false,
                areOthersAssociated: false,
                hasEuFunds: false,
            },
            expectedOutput: {
                stateRate: 0,
                stateAmount: 0,
            },
        },

        'departemental': {
            input: {
                scale: Calculator.SCALE_DEPARTMENTAL,
                population: 55391,
                density: 103,
                poverty: 0.14,
                previousBudget: 34027,
                isTargetPublic: true,
                hasOrganizedLocally: true,
                hasHub: false,
                areOthersAssociated: false,
                hasEuFunds: false,
            },
            expectedOutput: {
                stateRate: 0.39,
                stateAmount: 21755,
            },
        },

        'interdepartemental': {
            input: {
                scale: Calculator.SCALE_INTERDEPARTMENTAL,
                population: 55391,
                density: 103,
                poverty: 0.14,
                previousBudget: 34027,
                isTargetPublic: true,
                hasOrganizedLocally: true,
                hasHub: true,
                areOthersAssociated: true,
                hasEuFunds: true,
            },
            expectedOutput: {
                stateRate: 0.64,
                stateAmount: 60492,
            },
        },

        'regional': {
            input: {
                scale: Calculator.SCALE_REGIONAL,
                population: 14000000,
                density: 400,
                poverty: 0.5,
                previousBudget: 200000,
                isTargetPublic: true,
                hasOrganizedLocally: true,
                hasHub: true,
                areOthersAssociated: true,
                hasEuFunds: true,
            },
            expectedOutput: {
                stateRate: 0.65,
                stateAmount:  371429,
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
