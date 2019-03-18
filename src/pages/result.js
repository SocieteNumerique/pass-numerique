import { h, Component } from 'preact';
import { route } from 'preact-router';
import {Calculator} from "../simulator/calculator";

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
        const calculator = new Calculator();

        const result = calculator.compute({
            scale: parseInt(this.props.scale),
            population: parseInt(this.props.population),
            density: parseInt(this.props.density),
            poverty: parseInt(this.props.poverty) / 100,
            previousBudget: parseInt(this.props.previousBudget),
            isTargetPublic: this.props.isTargetPublic === '1',
            hasOrganizedLocally: this.props.hasOrganizedLocally === '1',
            hasHub: this.props.hasHub === '1',
            areOthersAssociated: this.props.areOthersAssociated === '1',
            hasEuFunds: this.props.hasEuFunds === '1',
        });

        const total = parseInt(this.props.previousBudget) + result.stateAmount;

        return (
            <div className="result">
                <h1 className="result__title">
                    Budget prévisionnel
                </h1>

                <div className="result__field">
                    <div className="result__field__label">
                        Budget estimé du porteur de projet
                    </div>
                    <div className="result__field__value">
                        {parseInt(this.props.previousBudget).toLocaleString('fr')} €
                    </div>
                </div>

                <div className="result__field">
                    <div className="result__field__label">
                        Taux estimé de cofinancement de l'Etat
                    </div>
                    <div className="result__field__value">
                        {result.stateRate * 100}%
                    </div>
                </div>

                <div className="result__field">
                    <div className="result__field__label">
                        Montant estimé du cofinancement de l'Etat
                    </div>
                    <div className="result__field__value">
                        {result.stateAmount.toLocaleString('fr')} €
                    </div>
                </div>

                <div className="result__field">
                    <div className="result__field__label">
                        Budget total du projet
                    </div>
                    <div className="result__field__value">
                        {total.toLocaleString('fr')} €
                    </div>
                </div>

                <div className="result__field">
                    <div className="result__field__label">
                        Nombre approximatif de pass déployés
                    </div>
                    <div className="result__field__value">
                        {Math.floor((total * 0.9) / 10).toLocaleString('fr')}
                    </div>
                </div>

                <div className="result__field">
                    <div className="result__field__label">
                        Nombre approximatif de personnes ciblées (chéquier de 10 pass par personne)
                    </div>
                    <div className="result__field__value">
                        {Math.floor((total * 0.9) / 100).toLocaleString('fr')}
                    </div>
                </div>

                <br />

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
