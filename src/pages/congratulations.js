import { h, Component } from 'preact';

import IconSunglasses from '../components/icon-sunglasses';

export default class Congratulations extends Component {
    render() {
        return (
            <div className="congrats">
                <div className="congrats__icon">
                    <IconSunglasses />
                </div>

                <h1 className="congrats__title">
                    Félicitations !
                </h1>

                <h2 className="congrats__subtitle">
                    Vous bénéficierez d'une baisse de votre taxe d’habitation dès l'année prochaine.
                </h2>

                <div className="congrats__label">
                    <label for="">
                        Quel était le montant de votre taxe d’habitation en 2017 ?
                    </label>
                </div>

                <div className="congrats__field">
                    <input type="number" placeholder="Entrer le montant (en €)" />
                </div>

                <div className="congrats__submit">
                    <button type="button" className="page__button">
                        Calculer ma taxe d’habitation pour les 3 prochaines années
                    </button>
                </div>
            </div>
        )
    }
};
