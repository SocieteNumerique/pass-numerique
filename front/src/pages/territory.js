import { h, Component } from 'preact';
import { route } from 'preact-router';

export default class Territory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            population: this.parseStat(this.props.population),
            density: this.parseStat(this.props.density),
            poverty: this.parseStat(this.props.poverty),
        };
    }

    parseStat(value) {
        value = parseFloat(value);

        if (isNaN(value) || value < 0) {
            return '';
        }

        return value + '';
    }

    componentWillMount() {
        if (-1 === [1, 2, 3, 4].indexOf(parseInt(this.props.scale))) {
            route('/not-found', true);
        }

        if (isNaN(parseInt(this.props.previousBudget))) {
            route('/not-found', true);
        }
    }

    handleButtonClick() {
        if (!this.state.population) {
            this.setState({ error: 'Le nombre d\'habitants est requis' });
            return;
        }

        if (!this.state.density) {
            this.setState({ error: 'La densité de population est requise' });
            return;
        }

        const density = parseFloat(this.state.density.replace(',', '.'));
        if (isNaN(density)) {
            this.setState({ error: 'Cette densité de population est invalide' });
            return;
        }

        if (!this.state.poverty) {
            this.setState({ error: 'Le taux de pauvreté est requis' });
            return;
        }

        const poverty = parseFloat(this.state.poverty.replace(',', '.'));
        if (isNaN(poverty)) {
            this.setState({ error: 'Ce taux de pauvreté est invalide' });
            return;
        }

        route('/community/'+[
            this.props.territory,
            this.props.scale,
            this.props.previousBudget,
            density,
            poverty,
            this.state.population,
        ].join('/'));
    }

    handleBackClick() {
        route('/home/'+[this.props.territory, this.props.scale, this.props.previousBudget].join('/'));
    }

    render() {
        return (
            <div className="home">
                <h1 className="home__title">
                    Simulation Pass Numériques
                </h1>

                <div className="home__subtitle">
                    Fiche d'identité du porteur de projet
                </div>

                {this.state.error ? <div className="form-error">{this.state.error}</div> : ''}

                <div className="home__field">
                    <div className="home__field__label">
                        Nombre d'habitants
                    </div>
                    <input type="number"
                           value={this.state.population}
                           onKeyUp={(e) => this.handleInputEnterPressed(e)}
                           onInput={(e) => this.setState({ population: parseInt(e.target.value) })}
                    />
                </div>

                <div className="home__field">
                    <div className="home__field__label">
                        Densité de population (en hab/km²)
                    </div>
                    <input type="text"
                           value={this.state.density}
                           onKeyUp={(e) => this.handleInputEnterPressed(e)}
                           onInput={(e) => this.setState({ density: e.target.value })}
                    />
                </div>

                <div className="home__field">
                    <div className="home__field__label">
                        Taux de pauvreté en % (INSEE 2015)
                    </div>
                    <input type="text"
                           value={this.state.poverty}
                           onKeyUp={(e) => this.handleInputEnterPressed(e)}
                           onInput={(e) => this.setState({ poverty: e.target.value })}
                    />
                </div>

                <br />

                <div className="home__submit">
                    <button type="button" className="page__button" onClick={() => this.handleButtonClick()}>
                        Continuer
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
