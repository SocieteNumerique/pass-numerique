import { h, Component } from 'preact';

export default class Result extends Component {
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
                    <a href="/" className="page__button page__button--small">Recommencer</a>
                </div>
            </div>
        )
    }
};
