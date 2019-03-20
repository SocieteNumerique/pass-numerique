import { h, Component } from 'preact';
import { route } from 'preact-router';

import { Calculator } from '../simulator/calculator';
import {api} from '../api/api';

export default class Home extends Component {
    constructor(props) {
        super(props);

        const scale = !isNaN(parseInt(this.props.scale)) ? parseInt(this.props.scale) : null;

        this.state = {
            scale: scale,
            previousBudget: parseInt(this.props.previousBudget),
            autocompleteDisabled: scale === null,
            autocompleteCode: '',
            autocompleteLoading: false,
            autocompleteResult: null,
            error: null,
        };
    }

    handleIntChange(property, value, enableAutocomplete) {
        value = parseInt(value);
        if (isNaN(value) || value < 0) {
            value = null;
        }

        if (enableAutocomplete) {
            this.setState({ [property]: value, autocompleteDisabled: false });
        } else {
            this.setState({ [property]: value });
        }

        if (property === 'scale') {
            this.findArea(value, this.state.autocompleteCode);
        }
    }

    handleInputEnterPressed(event) {
        if (event.keyCode === 13) {
            this.handleButtonClick();
        }
    }

    handleAutocompleteChange(event) {
        this.findArea(this.state.scale, event.target.value.trim());
    }

    findArea(scale, code) {
        if (code.length === 0) {
            this.setState({ autocompleteLoading: false, autocompleteCode: code, autocompleteResult: null });

            return;
        }

        this.setState({ autocompleteLoading: true, autocompleteCode: code, autocompleteResult: null });

        const request = api.findArea(scale, code);

        request.then((response) => {
            const results = response.data['hydra:member'];

            if (results.length > 0) {
                this.setState({ autocompleteLoading: false, autocompleteResult: results[0] });
            } else {
                this.setState({ autocompleteLoading: false, autocompleteResult: false });
            }
        });

        request.catch(() => {
            this.setState({ autocompleteLoading: false, autocompleteResult: false });
        });
    }

    handleButtonClick() {
        if (!this.state.scale) {
            this.setState({ error: 'L\'échelle territoriale est requise' });
            return;
        }

        if (!this.state.previousBudget) {
            this.setState({ error: 'Le budget alloué en 2019 au pass numérique est requis' });
            return;
        }

        if (!this.state.autocompleteResult) {
            route('/territory/'+[this.state.scale, this.state.previousBudget].join('/'));
        } else {
            route('/territory/'+[
                this.state.scale,
                this.state.previousBudget,
                this.state.autocompleteResult.density ? this.state.autocompleteResult.density : -1,
                this.state.autocompleteResult.poverty ? this.state.autocompleteResult.poverty : -1,
                this.state.autocompleteResult.population ? this.state.autocompleteResult.population : -1,
            ].join('/'));
        }
    }

    render() {
        return (
            <div className="home">
                <h1 className="home__title">
                    Simulation Pass Numériques
                </h1>

                <div className="home__subtitle">
                    Estimation du co-financement de l’Etat
                </div>

                {this.state.error ? <div className="form-error">{this.state.error}</div> : ''}

                <div className="home__field">
                    <div className="home__field__label">
                        Échelle territoriale du porteur de projet
                    </div>
                    <select onChange={(e) => this.handleIntChange('scale', e.target.value, true)}>
                        <option selected={!this.state.scale} disabled />
                        <option selected={this.state.scale === Calculator.SCALE_INTERMUNICIPAL}
                                value={Calculator.SCALE_INTERMUNICIPAL}>
                            Intercommunale
                        </option>
                        <option selected={this.state.scale === Calculator.SCALE_DEPARTMENTAL}
                                value={Calculator.SCALE_DEPARTMENTAL}>
                            Départementale
                        </option>
                        <option selected={this.state.scale === Calculator.SCALE_INTERDEPARTMENTAL}
                                value={Calculator.SCALE_INTERDEPARTMENTAL}>
                            Interdépartementale
                        </option>
                        <option selected={this.state.scale === Calculator.SCALE_REGIONAL}
                                value={Calculator.SCALE_REGIONAL}>
                            Régionale
                        </option>
                    </select>
                </div>

                <div className="home__field">
                    <div className="home__field__label">
                        Budget pass numérique en 2019 (en €)
                    </div>
                    <input type="number"
                           value={this.state.previousBudget}
                           onKeyUp={(e) => this.handleInputEnterPressed(e)}
                           onInput={(e) => this.handleIntChange('previousBudget', e.target.value, false)}
                    />
                </div>

                <div className="home__field">
                    <div className="home__field__label">
                        Code INSEE du territoire concerné
                    </div>
                    <input type="text"
                           disabled={this.state.autocompleteDisabled}
                           className={this.state.autocompleteLoading ? 'home__field__input-loading' : ''}
                           value={this.state.autocompleteCode}
                           onInput={(e) => this.handleAutocompleteChange(e)}
                    />
                </div>
                <div className="home__territory-result">
                    {this.state.autocompleteResult
                        ? this.state.autocompleteResult.name
                        : (
                            this.state.autocompleteResult === false ? 'Statistiques indisponibles pour ce territoire' : '-'
                        )
                    }
                </div>
                <button type="button" onClick={() => this.handleButtonClick()}
                        className="home__switch-button page__button page__button--link">
                    Ou entrer les statistiques locales manuellement
                </button>

                <br />

                <div className="home__submit">
                    <button type="button" className="page__button" onClick={() => this.handleButtonClick()}>
                        Continuer
                    </button>
                </div>

                <div className="legalities">
                    Le calcul effectué n’a qu’une valeur indicative pour l’instruction du dossier.
                    Il ne préjuge pas du montant qui sera finalement attribué par l’Agence du Numérique.
                </div>
            </div>
        )
    }
};
