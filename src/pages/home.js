import { h, Component } from 'preact';
import { route } from 'preact-router';

import Calculator from '../services/calculator';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: null,
            dependents: null,
            income: null,
            error: null,
        };

        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleDependentsChange = this.handleDependentsChange.bind(this);
        this.handleIncomeEnterPressed = this.handleIncomeEnterPressed.bind(this);
        this.handleIncomeChange = this.handleIncomeChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }

    handleStatusChange(event) {
        this.setState({
            status: parseInt(event.target.value),
        });
    }

    handleDependentsChange(event) {
        this.setState({
            dependents: event.target.value,
        });
    }

    handleIncomeEnterPressed(event) {
        if (event.keyCode === 13) {
            this.handleButtonClick();
        }
    }

    handleIncomeChange(event) {
        this.setState({
            income: parseInt(event.target.value) || null,
        });
    }

    handleButtonClick() {
        if (!this.state.status) {
            this.setState({
                error: 'Votre situation familiale est requise',
            });

            return;
        }

        if (!this.state.dependents) {
            this.setState({
                error: 'Votre nombre de personnes à charge est requis',
            });

            return;
        }

        if (!this.state.income) {
            this.setState({
                error: 'Votre revenu mensuel est requis',
            });

            return;
        }

        let calculator = new Calculator();

        if (calculator.isExempted(this.state.status, this.state.dependents, this.state.income)) {
            route('/exoneration/'+this.state.status+'/'+this.state.dependents+'/'+this.state.income);

            return;
        }

        route('/no-exoneration');
    }

    render() {
        return (
            <div className="home">
                <h1 className="home__title">
                    Vais-je bénéficier des exonérations de la taxe d’habitation ?
                </h1>

                <div className="home__subtitle">
                    Si oui, de combien ?
                </div>

                {this.state.error ? <div className="form-error">{this.state.error}</div> : ''}

                <div className="home__field">
                    <select onChange={this.handleStatusChange}>
                        <option selected disabled>Ma situation familiale</option>
                        <option value={Calculator.STATUS_SINGLE}>Je suis célibataire</option>
                        <option value={Calculator.STATUS_MARRIED}>Je suis marié(e) ou pacsé(e)</option>
                        <option value={Calculator.STATUS_CONCUBINAGE}>Je suis en concubinage/colocation</option>
                        <option value={Calculator.STATUS_WIDOW}>Je suis veuf/veuve</option>
                    </select>
                </div>

                <div className="home__field">
                    <select onChange={this.handleDependentsChange}>
                        <option selected disabled>Nombre de personnes à charge</option>
                        <option value="0">Aucune personne à charge</option>
                        <option value="1">1 personne à charge</option>
                        <option value="2">2 personnes à charge</option>
                        <option value="3">3 personnes à charge</option>
                        <option value="4">4 personnes à charge</option>
                        <option value="5">5 personnes à charge</option>
                        <option value="6">6 personnes à charge</option>
                        <option value="7">7 personnes à charge</option>
                        <option value="8">8 personnes à charge</option>
                        <option value="9">9 personnes à charge</option>
                        <option value="10">10 personnes à charge</option>
                        <option value="0+">Ayant eu des personnes à charge</option>
                    </select>
                </div>

                <div className="home__field">
                    <input type="number"
                           placeholder="Revenu mensuel net de mon foyer (en €)"
                           value={this.state.income}
                           onKeyUp={this.handleIncomeEnterPressed}
                           onInput={this.handleIncomeChange}
                    />
                </div>

                <div className="home__submit">
                    <button type="button" className="page__button" onClick={this.handleButtonClick}>
                        C'est parti !
                    </button>
                </div>

                <div className="legalities">
                    Le calcul effectué est purement anonyme et n’a qu’une valeur indicative.
                    Il dépend uniquement des éléments en notre possession et ne préjuge en rien
                    du montant qui sera finalement retenu par l’administration fiscale.
                </div>
            </div>
        )
    }
};
