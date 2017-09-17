import { h, Component } from 'preact';

import Sharer from '../services/sharer';

import IconFacebook from './icon-facebook';
import IconTwitter from './icon-twitter';
import IconGithub from './icon-github';
import IconEnMarche from './icon-en-marche';

export default class Footer extends Component {
    render() {
        const sharer = new Sharer();

        return (
            <footer className="footer">
                <div className="footer__content">
                    <div className="footer__buttons">
                        <span className="footer__button footer__button--facebook"
                              onClick={() => sharer.share('facebook', 'https://simuletataxe.fr', 'Simule ta taxe d\'habitation !')}>
                            <IconFacebook />
                        </span>

                        <span className="footer__button footer__button--twitter"
                              onClick={() => sharer.share('twitter', 'https://simuletataxe.fr', 'Simule ta taxe d\'habitation !')}>
                            <IconTwitter />
                        </span>

                        <button type="button"
                                className="footer__button footer__button--iframe"
                                onClick={this.props.onModalClick}>
                            Copier le code d’intégration
                        </button>
                    </div>

                    <div className="footer__credits">
                        <span>Libre sur</span>
                        <a href="https://github.com/EnMarche/simuletataxe.fr"
                           target="_blank">
                            <IconGithub />
                        </a>
                        <span>et préparé par</span>
                        <a href="https://en-marche.fr"
                           target="_blank">
                            <IconEnMarche />
                        </a>
                    </div>
                </div>
            </footer>
        )
    }
};
