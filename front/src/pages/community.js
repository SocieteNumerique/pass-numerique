import { h, Component } from 'preact';
import { route } from 'preact-router';

export default class Community extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isTargetPublic: this.props.isTargetPublic ? !!parseInt(this.props.isTargetPublic) : false,
            hasOrganizedLocally: this.props.hasOrganizedLocally ? !!parseInt(this.props.hasOrganizedLocally) : false,
        };
    }

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

    handleChange(property) {
        this.setState({ [property]: !this.state[property] });
    }

    handleButtonClick() {
        if (!this.state.isTargetPublic) {
            route('/disqualified');
            return;
        }

        route('/bonus/'+[
            this.props.territory,
            this.props.scale,
            this.props.population,
            this.props.density,
            this.props.poverty,
            this.props.previousBudget,
            this.state.isTargetPublic ? 1 : 0,
            this.state.hasOrganizedLocally ? 1 : 0,
        ].join('/'));
    }

    handleBackClick() {
        route('/territory/'+[
            this.props.territory,
            this.props.scale,
            this.props.population,
            this.props.density,
            this.props.poverty,
            this.props.previousBudget,
        ].join('/'));
    }

    render() {
        return (
            <div className="home">
                <h1 className="home__title">
                    Simulation Pass Numérique
                </h1>

                <div className="home__subtitle">
                    Évaluation du projet
                </div>

                <div className="home__checkbox">
                    <div className="form-checkbox">
                        <input type="checkbox" id="isTargetPublic" checked={this.state.isTargetPublic}
                               onChange={() => this.handleChange('isTargetPublic')} />
                        <label htmlFor="isTargetPublic">
                            <div>
                                Le projet cible des publics éloignés du numérique (jeunes non diplômés,
                                personnes âgées, personnes isolées, personnes allophones).
                            </div>
                        </label>
                    </div>
                </div>

                <div className="home__checkbox">
                    <div className="form-checkbox">
                        <input type="checkbox" id="hasOrganizedLocally" checked={this.state.hasOrganizedLocally}
                               onChange={() => this.handleChange('hasOrganizedLocally')} />
                        <label htmlFor="hasOrganizedLocally">
                            <div>
                                Le porteur de projet a engagé des démarches de consolidation et de
                                structuration des acteurs de l'inclusion et de la médiation numériques
                                sur son territoire.
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
