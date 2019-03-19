import { h, Component } from 'preact';

export default class NotFound extends Component {
    render() {
        return (
            <div className="not-found">
                <h1 className="not-found__title">
                    Cette page n'existe pas !
                </h1>

                <div className="not-found__subtitle">
                    Vous trouverez peut-être ce que vous cherchiez sur notre page d'accueil.
                </div>

                <div className="not-found__button">
                    <a href="/" className="page__button page__button--small">
                        Retour à l'accueil
                    </a>
                </div>
            </div>
        )
    }
};
