import { h, Component } from 'preact';
import { route } from 'preact-router';
import {Calculator} from '../simulator/calculator';

const isDev = document.body.getAttribute('data-env') === 'dev';
const apiRoot = isDev ? 'http://localhost:8000' : 'https://api.passnum.societenumerique.gouv.fr';

export default class Result extends Component {
    componentWillMount() {
        if (-1 === [1, 2, 3, 4].indexOf(parseInt(this.props.scale))) {
            route('/not-found', true);
        }

        if (isNaN(parseInt(this.props.population))
            || isNaN(parseFloat(this.props.density))
            || isNaN(parseFloat(this.props.poverty))
            || isNaN(parseInt(this.props.previousBudget))) {
            route('/not-found', true);
        }
    }

    handleBackClick() {
        route('/bonus/'+[
            this.props.scale,
            this.props.population,
            this.props.density,
            this.props.poverty,
            this.props.previousBudget,
            this.props.isTargetPublic,
            this.props.hasOrganizedLocally,
            this.props.hasHub,
            this.props.areOthersAssociated,
            this.props.hasEuFunds,
        ].join('/'));
    }

    handlePdfClick() {
        const calculator = new Calculator();

        const result = calculator.compute({
            scale: parseInt(this.props.scale),
            population: parseInt(this.props.population),
            density: parseFloat(this.props.density),
            poverty: parseFloat(this.props.poverty) / 100,
            previousBudget: parseInt(this.props.previousBudget),
            isTargetPublic: this.props.isTargetPublic === '1',
            hasOrganizedLocally: this.props.hasOrganizedLocally === '1',
            hasHub: this.props.hasHub === '1',
            areOthersAssociated: this.props.areOthersAssociated === '1',
            hasEuFunds: this.props.hasEuFunds === '1',
        });

        const total = parseInt(this.props.previousBudget) + result.stateAmount;

        let payload = {
            scale: parseInt(this.props.scale),
            population: parseInt(this.props.population),
            density: parseFloat(this.props.density),
            poverty: parseFloat(this.props.poverty) / 100,
            previousBudget: parseInt(this.props.previousBudget),
            isTargetPublic: this.props.isTargetPublic === '1',
            hasOrganizedLocally: this.props.hasOrganizedLocally === '1',
            hasHub: this.props.hasHub === '1',
            areOthersAssociated: this.props.areOthersAssociated === '1',
            hasEuFunds: this.props.hasEuFunds === '1',
            stateAmount: result.stateAmount,
            totalAmount: total,
            stateRate: result.stateRate,
            numberPasses: Math.floor((total * 0.9) / 10),
            numberPersons: Math.floor((total * 0.9) / 100),
        };

        window.open(apiRoot + '/pdf/preview?payload=' + encodeURIComponent(JSON.stringify(payload)), '_blank');
    }

    render() {
        const calculator = new Calculator();

        const result = calculator.compute({
            scale: parseInt(this.props.scale),
            population: parseInt(this.props.population),
            density: parseFloat(this.props.density),
            poverty: parseFloat(this.props.poverty) / 100,
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
                        Montant estimé du cofinancement de l'Etat
                    </div>
                    <div className="result__field__value">
                        {Math.round(result.stateAmount).toLocaleString('fr')} €
                    </div>
                </div>

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
                        Budget total du projet
                    </div>
                    <div className="result__field__value">
                        {total.toLocaleString('fr')} €
                    </div>
                </div>

                <div className="result__field">
                    <div className="result__field__label">
                        Taux estimé de cofinancement de l'Etat
                    </div>
                    <div className="result__field__value">
                        {Math.round(result.stateRate * 100)}%
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
                    <button type="button" onClick={() => this.handlePdfClick()}
                            className="page__button page__button--small startover--reduction">
                        Générer un PDF avec ces résultats
                    </button>

                    <button type="button" onClick={() => window.location.href = '/'}
                            className="page__button page__button--small page__button--outline">
                        Recommencer
                    </button>

                    <button type="button" className="page__button page__button--small page__button--outline"
                            onClick={() => this.handleBackClick()}>
                        Retour
                    </button>
                </div>
            </div>
        )
    }
};
