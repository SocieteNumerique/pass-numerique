import { h, Component } from 'preact';

export default class Home extends Component {
    render() {
        return (
            <div className="home">
                <h1 className="home__title">
                    Vais-je bénéficier des exonérations de la taxe d’habitation ?
                </h1>

                <div className="home__subtitle">
                    Si oui, de combien ?
                </div>

                <div className="home__field">
                    <select>
                        <option>Je suis célibataire</option>
                    </select>
                </div>

                <div className="home__field">
                    <select>
                        <option>Sans enfant</option>
                    </select>
                </div>

                <div className="home__field">
                    <input type="number" placeholder="Revenu mensuel net de mon foyer (en €)" />
                </div>

                <div className="home__submit">
                    <button type="button" className="page__button">
                        C'est parti !
                    </button>
                </div>

                <div className="home__legalities">
                    Le calcul effectué est purement anonyme et n’a qu’une valeur indicative.
                    Il dépend uniquement des éléments en notre possession et ne préjuge en rien
                    du montant qui sera finalement retenu par l’administration fiscale.
                </div>
            </div>
        )
    }
};
