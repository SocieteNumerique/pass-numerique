export class Calculator {
    compute(input) {
        let score = 0;
        for (let prop in Calculator.COEFFICIENTS) {
            if (typeof input[prop] !== 'undefined' && input[prop]) {
                score += Calculator.COEFFICIENTS[prop];
            }
        }

        let rate = Calculator.DEFAULT_RATE;
        for (let rateMaxScore in Calculator.RATES) {
            if (score <= rateMaxScore) {
                rate = Calculator.RATES[rateMaxScore];
                break;
            }
        }

        const amount = rate * input.previousBudget;

        return {
            stateRate: rate,
            stateAmount: (amount <= Calculator.MAX_AMOUNT) ? Math.round(amount) : Calculator.MAX_AMOUNT,
        };
    }
}

Calculator.SCALE_INTERMUNICIPAL = 1;
Calculator.SCALE_DEPARTMENTAL = 2;
Calculator.SCALE_INTERDEPARTMENTAL = 3;
Calculator.SCALE_REGIONAL = 4;

Calculator.NATIONAL_STATS = {
    [Calculator.SCALE_INTERMUNICIPAL]: {
        population: 51944.0394842869,
        density: 152.128767123287,
        poverty: 0.136157937147462,
    },
    [Calculator.SCALE_DEPARTMENTAL]: {
        population: 671549.916666667,
        density: 563.91875,
        poverty: 0.1479375,
    },
    [Calculator.SCALE_INTERDEPARTMENTAL]: {
        population: 671549.916666667,
        density: 563.91875,
        poverty: 0.1479375,
    },
    [Calculator.SCALE_REGIONAL]: {
        population: 4959137.84615385,
        density: 171.161538461538,
        poverty: 0.148230769230769,
    },
};

Calculator.COEFFICIENTS = {
    isRural: 2,
    isCityDistrict: 2,
    isCityHeart: 2,
    isOverseas: 2,
    isMountain: 2,
    hasNoHub: 10,
    areOthersAssociated: 30,
    hasEuFunds: 5,
    isOfferIdentified: 20,
};

Calculator.RATES = {
    19: 0.2,
    30: 0.3,
    40: 0.4,
    50: 0.5,
    60: 0.6,
    70: 0.7,
    80: 0.8,
    90: 0.9,
};
Calculator.DEFAULT_RATE = 1;

Calculator.MAX_AMOUNT = 1500000;
