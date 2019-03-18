import { h, Component } from 'preact';
import { route } from 'preact-router';

export default class Result extends Component {
    componentWillMount() {
        if (-1 === [1, 2, 3, 4].indexOf(parseInt(this.props.scale))) {
            route('/not-found', true);
        }

        if (isNaN(parseInt(this.props.population))
            || isNaN(parseInt(this.props.density))
            || isNaN(parseInt(this.props.poverty))
            || isNaN(parseInt(this.props.previousBudget))) {
            route('/not-found', true);
        }
    }

    render() {
        return (
            <div className="result">
                <h1 className="result__title">
                    Ma taxe d’habitation
                    <br />
                    sera de ...
                </h1>

                <div className="result__years">
                    <div className="result__year">
                        200 € en 2018
                    </div>

                    <br />

                    <div className="result__year">
                        100 € en 2019
                    </div>

                    <br />

                    <div className="result__year result__year--highlight">
                        0 € en 2020
                    </div>
                </div>

                <div>
                    <button type="button"
                            onClick={() => window.location.href = '/'}
                            className="page__button page__button--small startover--reduction">
                        Recommencer
                    </button>
                </div>
            </div>
        )
    }
};
