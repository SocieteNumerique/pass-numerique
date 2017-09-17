import { h, Component } from 'preact';
import { route } from 'preact-router';

import Calculator from '../services/calculator';

import IconSunglasses from '../components/icon-sunglasses';

export default class Congratulations extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tax: null,
            error: null,
        };

        this.handleTaxEnterPressed = this.handleTaxEnterPressed.bind(this);
        this.handleTaxChange = this.handleTaxChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleTaxEnterPressed(event) {
        if (event.keyCode === 13) {
            this.handleButtonClick();
        }
    }

    handleTaxChange(event) {
        this.setState({
            tax: parseInt(event.target.value) || null,
        });
    }

    handleButtonClick() {
        if (!this.state.tax) {
            this.setState({
                error: 'Votre taxe d\'habitation est requise',
            });

            return;
        }

        let calculator = new Calculator();

        let nextYears = calculator.computeNextYears(
            this.props.status,
            this.props.dependents,
            this.props.income,
            this.state.tax
        );

        route('/result/'+nextYears[2018]+'/'+nextYears[2019]+'/'+nextYears[2020]);
    }

    render() {
        return (
            <div className="congrats">
                <div className="congrats__icon">
                    <IconSunglasses />
                </div>

                <h1 className="congrats__title">
                    Félicitations !
                </h1>

                <h2 className="congrats__subtitle">
                    Vous bénéficierez d'une baisse de votre taxe d’habitation dès l'année prochaine.
                </h2>

                {this.state.error ? <div className="form-error">{this.state.error}</div> : ''}

                <div className="congrats__label">
                    <label for="previous-tax">
                        Quel était le montant de votre taxe d’habitation en 2017 ?
                    </label>
                </div>

                <div className="congrats__field">
                    <input type="number"
                           id="previous-tax"
                           name="previous-tax"
                           placeholder="Entrer le montant (en €)"
                           value={this.state.tax}
                           onKeyUp={this.handleTaxEnterPressed}
                           onInput={this.handleTaxChange}
                    />
                </div>

                <div className="congrats__submit">
                    <button type="button" className="page__button" onClick={this.handleButtonClick}>
                        Calculer ma taxe d’habitation pour les 3 prochaines années
                    </button>
                </div>
            </div>
        )
    }
};
