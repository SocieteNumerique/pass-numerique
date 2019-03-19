import { h, Component } from 'preact';

export default class Disqualified extends Component {
    render() {
        return (
            <div className="not-found">
                <h1 className="not-found__title">
                    Votre projet n'est pas éligible
                </h1>

                <div className="not-found__subtitle">
                    Il ne remplit pas les conditions requises pour être accompagné par le financement de l'État.
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
