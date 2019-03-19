export class Calculator {
    compute(input) {
        if (!input.isTargetPublic) {
            return { stateRate: 0, stateAmount: 0 };
        }

        let rate = 0.2;
        if (input.hasOrganizedLocally) {
            rate += 0.15;
        }

        rate += this._computeTerritoryBonus(input);

        if (input.hasHub) {
            rate += 0.07;
        }

        if (input.areOthersAssociated) {
            rate += 0.1;
        }

        if (input.hasEuFunds) {
            rate += 0.1;
        }

        const total = input.previousBudget / (1 - rate);
        const amount = total * rate;

        return {
            stateRate: Math.round(rate * 100) / 100,
            stateAmount: (amount <= Calculator.MAX_AMOUNT) ? Math.round(amount) : Calculator.MAX_AMOUNT,
        };
    }

    _computeTerritoryBonus(input) {
        const ratios = {
            population: (input.population / Calculator.NATIONAL_STATS[input.scale].population) - 1,
            density: (input.density / Calculator.NATIONAL_STATS[input.scale].density),
            poverty: input.poverty - Calculator.NATIONAL_STATS[input.scale].poverty,
        };

        let score = 0;

        // Population
        if (ratios.population >= 0.1 && ratios.population < 0.2) {
            score += 5;
        } else if (ratios.population >= 0.2 && ratios.population < 0.3) {
            score += 10;
        } else if (ratios.population >= 0.3 && ratios.population < 0.4) {
            score += 15;
        } else if (ratios.population >= 0.4 && ratios.population < 0.5) {
            score += 20;
        } else if (ratios.population >= 0.5) {
            score += 25;
        }

        // Density
        if (ratios.density <= 0.5 && ratios.density > 0.4) {
            score += 5;
        } else if (ratios.density <= 0.4 && ratios.density > 0.3) {
            score += 10;
        } else if (ratios.density <= 0.3 && ratios.density > 0.2) {
            score += 15;
        } else if (ratios.density <= 0.2 && ratios.density > 0.1) {
            score += 20;
        } else if (ratios.density <= 0.1 && ratios.density > 0) {
            score += 25;
        }

        // Poverty
        if (ratios.poverty > 0.01 && ratios.poverty < 0.02) {
            score += 5;
        } else if (ratios.poverty > 0.02 && ratios.poverty < 0.03) {
            score += 10;
        } else if (ratios.poverty > 0.03 && ratios.poverty < 0.04) {
            score += 15;
        } else if (ratios.poverty > 0.04 && ratios.poverty < 0.05) {
            score += 20;
        } else if (ratios.poverty > 0.05) {
            score += 25;
        }

        if (score >= 1 && score < 10) {
            return 0.02;
        } else if (score >= 10 && score < 20) {
            return 0.03;
        } else if (score >= 20 && score < 30) {
            return 0.04;
        } else if (score >= 30) {
            return 0.05;
        }

        return 0;
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

Calculator.MAX_AMOUNT = 1500000;
