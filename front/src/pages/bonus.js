import { h, Component } from 'preact';
import { route } from 'preact-router';

export default class Bonus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasHub: this.props.hasHub ? !!parseInt(this.props.hasHub) : false,
            areOthersAssociated: this.props.areOthersAssociated ? !!parseInt(this.props.areOthersAssociated) : false,
            hasEuFunds: this.props.hasEuFunds ? !!parseInt(this.props.hasEuFunds) : false,
        };
    }

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

    handleChange(property) {
        this.setState({ [property]: !this.state[property] });
    }

    handleButtonClick() {
        route('/result/'+[
            this.props.territory,
            this.props.scale,
            this.props.population,
            this.props.density,
            this.props.poverty,
            this.props.previousBudget,
            this.props.isTargetPublic,
            this.props.hasOrganizedLocally,
            this.state.hasHub ? 1 : 0,
            this.state.areOthersAssociated ? 1 : 0,
            this.state.hasEuFunds ? 1 : 0,
        ].join('/'));
    }

    handleBackClick() {
        route('/community/'+[
            this.props.territory,
            this.props.scale,
            this.props.population,
            this.props.density,
            this.props.poverty,
            this.props.previousBudget,
            this.props.isTargetPublic,
            this.props.hasOrganizedLocally,
        ].join('/'));
    }

    render() {
        return (
            <div className="home">
                <h1 className="home__title">
                    Simulation Pass Numériques
                </h1>

                <div className="home__subtitle">
                    Primes de subvention
                </div>

                <div className="home__checkbox">
                    <div className="form-checkbox">
                        <input type="checkbox" id="hasHub"
                               onChange={() => this.handleChange('hasHub')} />
                        <label htmlFor="hasHub">
                            <div>
                                Un Hub de médiation numérique est présent sur le territoire.
                            </div>
                        </label>
                    </div>
                </div>

                <div className="home__checkbox">
                    <div className="form-checkbox">
                        <input type="checkbox" id="areOthersAssociated"
                               onChange={() => this.handleChange('areOthersAssociated')} />
                        <label htmlFor="areOthersAssociated">
                            <div>
                                Le(s) autre(s) porteur(s) de projet sur le même territoire sont associé(s)
                                à la démarche.
                            </div>
                        </label>
                    </div>
                </div>

                <div className="home__checkbox">
                    <div className="form-checkbox">
                        <input type="checkbox" id="hasEuFunds"
                               onChange={() => this.handleChange('hasEuFunds')} />
                        <label htmlFor="hasEuFunds">
                            <div>
                                Des fonds européens sont mobilisés par la collectivité dans le cadre
                                de l'achat de pass numériques.
                            </div>
                        </label>
                    </div>
                </div>

                <br />

                <div className="home__submit">
                    <button type="button" className="page__button" onClick={() => this.handleButtonClick()}>
                        Continuer
                    </button>
                </div>

                <button type="button" className="page__button page__button--small page__button--outline"
                        onClick={() => this.handleBackClick()}>
                    Retour
                </button>
            </div>
        )
    }
};
