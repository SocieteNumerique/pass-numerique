import { h, Component } from 'preact';

export default class Result extends Component {
    render() {
        return (
            <div className="result">
                <h1 className="result__title">
                    Ma taxe d’habitation sera de ...
                </h1>

                <div className="result__years">
                    <div className="result__year">
                        700 € en 2018
                    </div>

                    <br />

                    <div className="result__year">
                        350 € en 2019
                    </div>

                    <br />

                    <div className="result__year result__year--highlight">
                        0 € en 2020
                    </div>
                </div>
            </div>
        )
    }
};
