import { h, Component } from 'preact';
import { route } from 'preact-router';
import {Calculator} from "../simulator/calculator";

export default class Territory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isRural: false,
            isCityDistrict: false,
            isCityHeart: false,
            isOverseas: false,
            isMountain: false,
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
        route('/result/'+[
            this.props.scale,
            this.props.population,
            this.props.density,
            this.props.poverty,
            this.props.previousBudget,
            this.state.isRural ? 1 : 0,
            this.state.isCityDistrict ? 1 : 0,
            this.state.isCityHeart ? 1 : 0,
            this.state.isOverseas ? 1 : 0,
            this.state.isMountain ? 1 : 0,
        ].join('/'));
    }

    render() {
        return (
            <div className="home">
                <h1 className="home__title">
                    Simulation Pass Numérique
                </h1>

                <div className="home__subtitle">
                    Type(s) de territoire(s) de déploiement
                </div>

                {this.state.error ? <div className="form-error">{this.state.error}</div> : ''}

                <div className="home__checkbox">
                    <div className="form-checkbox">
                        <input type="checkbox" id="isRural"
                               onChange={() => this.handleChange('isRural')} />
                        <label htmlFor="isRural">
                            <div>
                                Territoire rural
                            </div>
                        </label>
                    </div>
                </div>

                <div className="home__checkbox">
                    <div className="form-checkbox">
                        <input type="checkbox" id="isCityDistrict"
                               onChange={() => this.handleChange('isCityDistrict')} />
                        <label htmlFor="isCityDistrict">
                            <div>
                                Quartier politique de la ville
                            </div>
                        </label>
                    </div>
                </div>

                <div className="home__checkbox">
                    <div className="form-checkbox">
                        <input type="checkbox" id="isCityHeart"
                               onChange={() => this.handleChange('isCityHeart')} />
                        <label htmlFor="isCityHeart">
                            <div>
                                Villes moyennes dans le cadre du plan "Action Cœur de Ville"
                            </div>
                        </label>
                    </div>
                </div>

                <div className="home__checkbox">
                    <div className="form-checkbox">
                        <input type="checkbox" id="isOverseas"
                               onChange={() => this.handleChange('isOverseas')} />
                        <label htmlFor="isOverseas">
                            <div>
                                Outre-mer
                            </div>
                        </label>
                    </div>
                </div>

                <div className="home__checkbox">
                    <div className="form-checkbox">
                        <input type="checkbox" id="isMountain"
                               onChange={() => this.handleChange('isMountain')} />
                        <label htmlFor="isMountain">
                            <div>
                                Territoire de montagne
                            </div>
                        </label>
                    </div>
                </div>

                <br />

                <div className="home__submit">
                    <button type="button" className="page__button" onClick={() => this.handleButtonClick()}>
                        Lancer la simulation
                    </button>
                </div>

                <button type="button" className="page__button page__button--small page__button--outline"
                        onClick={() => route('/')}>
                    Retour à l'accueil
                </button>
            </div>
        )
    }
};
