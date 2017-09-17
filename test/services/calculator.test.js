import { expect } from 'chai';

import Calculator from '../../src/services/calculator';

describe('Calculator', () => {
    let calculator = new Calculator();

    let scenariosMatrix = [
        //  Status                          Dependents   Income   Exempted?  Prev tax    2018    2019    2020
        [   Calculator.STATUS_SINGLE,       0,           2450,    true,      1000,       700,    350,    0       ],
        [   Calculator.STATUS_SINGLE,       0,           2550,    true,      1000,       867,    711,    556     ],
        [   Calculator.STATUS_SINGLE,       0,           2650,    false,     1000,       1000,   1000,   1000    ],

        [   Calculator.STATUS_SINGLE,       3,           5600,    true,      1000,       700,    350,    0       ],
        [   Calculator.STATUS_SINGLE,       3,           5750,    true,      1000,       870,    719,    568     ],
        [   Calculator.STATUS_SINGLE,       3,           5900,    false,     1000,       1000,   1000,   1000    ],

        [   Calculator.STATUS_CONCUBINAGE,  0,           4900,    true,      1000,       700,    350,    0       ],
        [   Calculator.STATUS_CONCUBINAGE,  0,           5050,    true,      1000,       786,    536,    286     ],
        [   Calculator.STATUS_CONCUBINAGE,  0,           5200,    false,     1000,       1000,   1000,   1000    ],

        [   Calculator.STATUS_CONCUBINAGE,  '0+',        5700,    true,      1000,       700,    350,    0       ],
        [   Calculator.STATUS_CONCUBINAGE,  '0+',        5800,    true,      1000,       801,    569,    338     ],
        [   Calculator.STATUS_CONCUBINAGE,  '0+',        6000,    false,     1000,       1000,   1000,   1000    ],

        [   Calculator.STATUS_CONCUBINAGE,  1,           5000,    true,      1000,       700,    350,    0       ],
        [   Calculator.STATUS_CONCUBINAGE,  1,           5150,    true,      1000,       798,    562,    326     ],
        [   Calculator.STATUS_CONCUBINAGE,  1,           5300,    false,     1000,       1000,   1000,   1000    ],

        [   Calculator.STATUS_MARRIED,      2,           5000,    true,      1000,       700,    350,    0       ],
        [   Calculator.STATUS_MARRIED,      2,           5200,    true,      1000,       879,    737,    596     ],
        [   Calculator.STATUS_MARRIED,      2,           5400,    false,     1000,       1000,   1000,   1000    ],

        [   Calculator.STATUS_MARRIED,      4,           7300,    true,      1000,       700,    350,    0       ],
        [   Calculator.STATUS_MARRIED,      4,           7400,    true,      1000,       845,    664,    483     ],
        [   Calculator.STATUS_MARRIED,      4,           7500,    false,     1000,       1000,   1000,   1000    ],

        [   Calculator.STATUS_WIDOW,        '0+',        3200,    true,      1000,       700,    350,    0       ],
        [   Calculator.STATUS_WIDOW,        '0+',        3300,    true,      1000,       832,    636,    440     ],
        [   Calculator.STATUS_WIDOW,        '0+',        3400,    false,     1000,       1000,   1000,   1000    ],
    ];

    for (let i in scenariosMatrix) {
        let scenario = scenariosMatrix[i];
        let name = [
            'Status: ' + scenario[0],
            'Dependents: ' + scenario[1],
            'Income: ' + scenario[2],
            'Previous tax: ' + scenario[4],
        ].join(' | ');

        describe('Scenario - '+name, () => {
            it(scenario[3] ? 'should be exempted' : 'should not be exempted', () => {
                expect(calculator.isExempted(scenario[0], scenario[1], scenario[2])).to.equal(scenario[3]);
            });

            it('should have taxes - 2018: '+scenario[5]+', 2019: '+scenario[6]+', 2020: '+scenario[7], () => {
                let taxes = calculator.computeNextYears(scenario[0], scenario[1], scenario[2], scenario[4]);

                expect(taxes[2018]).to.equal(scenario[5]);
                expect(taxes[2019]).to.equal(scenario[6]);
                expect(taxes[2020]).to.equal(scenario[7]);
            });
        });
    }
});
