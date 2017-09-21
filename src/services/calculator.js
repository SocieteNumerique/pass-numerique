import partsCounts from './parts-counts';
import thresholds from './thresholds';

export default class Calculator {
    isExempted(status, dependentsCount, yearlyReference) {
        let thresholds = this._getThresholds(status, dependentsCount);

        return yearlyReference <= thresholds.high;
    }

    computeNextYears(status, dependentsCount, yearlyReference, previousTax) {
        let thresholds = this._getThresholds(status, dependentsCount);

        if (yearlyReference <= thresholds.low) {
            return {
                2018: Math.ceil(previousTax * 0.7),
                2019: Math.ceil(previousTax * 0.35),
                2020: 0,
            };
        }

        if (yearlyReference <= thresholds.high) {
            let compute = (rate) => {
                return Math.ceil(
                    previousTax * (1 - (rate * (thresholds.high - yearlyReference) / (thresholds.high - thresholds.low)))
                );
            };

            return {
                2018: compute(0.3),
                2019: compute(0.65),
                2020: compute(1),
            };
        }

        return {
            2018: previousTax,
            2019: previousTax,
            2020: previousTax,
        };
    }

    _getThresholds(status, dependentsCount) {
        if (typeof Calculator.PARTS_COUNTS[status] === 'undefined') {
            throw new Error('Invalid status: '+ status);
        }

        if (typeof Calculator.PARTS_COUNTS[status][dependentsCount] === 'undefined') {
            throw new Error('Invalid dependents count: '+ dependentsCount);
        }

        return Calculator.THRESHOLDS[Calculator.PARTS_COUNTS[status][dependentsCount]];
    }
};

Calculator.STATUS_SINGLE = 1;
Calculator.STATUS_CONCUBINAGE = 2;
Calculator.STATUS_MARRIED = 3;
Calculator.STATUS_WIDOW = 4;

Calculator.PARTS_COUNTS = partsCounts;

Calculator.THRESHOLDS = thresholds;
