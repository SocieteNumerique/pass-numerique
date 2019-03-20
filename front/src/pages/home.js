import { h, Component } from 'preact';
import { route } from 'preact-router';

import { Calculator } from '../simulator/calculator';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scale: parseInt(this.props.scale),
            previousBudget: parseInt(this.props.previousBudget),
            autocompleteDisabled: true,
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
    }

    handleInputEnterPressed(event) {
        if (event.keyCode === 13) {
            this.handleButtonClick();
        }
    }

    handleAutocompleteChange(property, value) {
        value = parseInt(value);
        if (isNaN(value) || value < 0) {
            value = null;
        }

        this.setState({ [property]: value });
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

        route('/territory/'+[this.state.scale, this.state.previousBudget].join('/'));
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
                    <select onChange={(e) => this.handleIntChange('scale', e.target.value, true)}>
                        <option selected={!this.state.scale} disabled>
                            Échelle territoriale du porteur de projet
                        </option>
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
                    <input type="number"
                           placeholder="Budget pass numérique en 2019 (en €)"
                           value={this.state.previousBudget}
                           onKeyUp={(e) => this.handleInputEnterPressed(e)}
                           onInput={(e) => this.handleIntChange('previousBudget', e.target.value, false)}
                    />
                </div>

                <br />

                <div className="home__field">
                    <input type="text"
                           placeholder="Code INSEE du territoire"
                           disabled={this.state.autocompleteDisabled}
                           className={this.state.autocompleteLoading ? 'home__field__input-loading' : ''}
                           value={this.state.autocompleteCode}
                           onChange={(e) => this.handleAutocompleteChange(e)}
                    />
                </div>
                <div className="home__territory-result">
                    {this.state.autocompleteResult ? this.state.autocompleteResult.name : '-'}
                </div>
                <button type="button" onClick={() => this.handleButtonClick()}
                        className="home__switch-button page__button page__button--link">
                    Ou entrer les informations manuellement
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
