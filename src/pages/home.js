import { h, Component } from 'preact';
import { route } from 'preact-router';

import Calculator from '../services/calculator';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: Calculator.STATUS_SINGLE,
            dependents: '0',
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
        if (!this.state.income) {
            this.setState({
                error: 'Votre revenu mensuel est requis',
            });

            return;
        }

        let calculator = new Calculator();

        if (calculator.isExempted(this.state.status, this.state.dependents, this.state.income)) {
            route('/congratulations/'+this.state.status+'/'+this.state.dependents+'/'+this.state.income);

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
                        <option value={Calculator.STATUS_SINGLE} selected>Je suis célibataire</option>
                        <option value={Calculator.STATUS_MARRIED}>Je suis marié(e)</option>
                        <option value={Calculator.STATUS_CONCUBINAGE}>Je suis en concubinage</option>
                        <option value={Calculator.STATUS_WIDOW}>Je suis en veuf/veuve</option>
                    </select>
                </div>

                <div className="home__field">
                    <select onChange={this.handleDependentsChange}>
                        <option value="0" selected>Sans enfant</option>
                        <option value="1">1 enfant</option>
                        <option value="2">2 enfants</option>
                        <option value="3">3 enfants</option>
                        <option value="4">4 enfants</option>
                        <option value="5">5 enfants</option>
                        <option value="6">6 enfants</option>
                        <option value="7">7 enfants</option>
                        <option value="8">8 enfants</option>
                        <option value="9">9 enfants</option>
                        <option value="10">10 enfants</option>
                        <option value="0+">0 mais ayant élevé un enfant</option>
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
            </div>
        )
    }
};
