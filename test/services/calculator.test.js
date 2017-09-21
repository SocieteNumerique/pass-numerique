import { expect } from 'chai';

import Calculator from '../../src/services/calculator';

describe('Calculator', () => {
    let calculator = new Calculator();

    let scenariosMatrix = [
        //  Status                          Dependents   Income   Exempted?  Prev tax    2018    2019    2020
        [   Calculator.STATUS_SINGLE,       0,           26500,   true,      1000,       700,    350,    0       ],
        [   Calculator.STATUS_SINGLE,       0,           27500,   true,      1000,       850,    675,    500     ],
        [   Calculator.STATUS_SINGLE,       0,           28500,   false,     1000,       1000,   1000,   1000    ],

        [   Calculator.STATUS_SINGLE,       3,           60500,   true,      1000,       700,    350,    0       ],
        [   Calculator.STATUS_SINGLE,       3,           61500,   true,      1000,       775,    513,    250     ],
        [   Calculator.STATUS_SINGLE,       3,           63500,   false,     1000,       1000,   1000,   1000    ],

        [   Calculator.STATUS_CONCUBINAGE,  0,           53500,   true,      1000,       700,    350,    0       ],
        [   Calculator.STATUS_CONCUBINAGE,  0,           54500,   true,      1000,       775,    513,    250     ],
        [   Calculator.STATUS_CONCUBINAGE,  0,           56500,   false,     1000,       1000,   1000,   1000    ],

        [   Calculator.STATUS_CONCUBINAGE,  1,           61500,   true,      1000,       700,    350,    0       ],
        [   Calculator.STATUS_CONCUBINAGE,  1,           62500,   true,      1000,       775,    513,    250     ],
        [   Calculator.STATUS_CONCUBINAGE,  1,           64500,   false,     1000,       1000,   1000,   1000    ],

        [   Calculator.STATUS_MARRIED,      2,           54500,   true,      1000,       700,    350,    0       ],
        [   Calculator.STATUS_MARRIED,      2,           55500,   true,      1000,       775,    513,    250     ],
        [   Calculator.STATUS_MARRIED,      2,           57500,   false,     1000,       1000,   1000,   1000    ],

        [   Calculator.STATUS_MARRIED,      4,           78500,   true,      1000,       700,    350,    0       ],
        [   Calculator.STATUS_MARRIED,      4,           79500,   true,      1000,       775,    513,    250     ],
        [   Calculator.STATUS_MARRIED,      4,           81500,   false,     1000,       1000,   1000,   1000    ],

        [   Calculator.STATUS_WIDOW,        '0+',        34500,   true,      1000,       700,    350,    0       ],
        [   Calculator.STATUS_WIDOW,        '0+',        35500,   true,      1000,       800,    567,    334     ],
        [   Calculator.STATUS_WIDOW,        '0+',        37000,   false,     1000,       1000,   1000,   1000    ],
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
