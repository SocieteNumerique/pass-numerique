import { h, Component } from 'preact';
import { route } from 'preact-router';

export default class Result extends Component {
    componentWillMount() {
        let taxes = [this.props.tax2018, this.props.tax2019, this.props.tax2020];

        for (let i in taxes) {
            if (isNaN(parseInt(taxes[i]))) {
                route('/not-found', true);
            }
        }
    }

    render() {
        return (
            <div className="result">
                <h1 className="result__title">
                    Ma taxe d’habitation<br/>sera de ...
                </h1>

                <div className="result__years">
                    <div className="result__year">
                        {this.props.tax2018} € en 2018
                    </div>

                    <br />

                    <div className="result__year">
                        {this.props.tax2019} € en 2019
                    </div>

                    <br />

                    <div className="result__year result__year--highlight">
                        {this.props.tax2020} € en 2020
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
