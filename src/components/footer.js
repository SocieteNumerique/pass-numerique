import { h, Component } from 'preact';

import IconFacebook from './icon-facebook';
import IconTwitter from './icon-twitter';
import IconGithub from './icon-github';
import IconEnMarche from './icon-en-marche';

export default class Footer extends Component {
    render() {
        return (
            <footer className="footer">
                <div className="footer__content">
                    <div className="footer__buttons">
                        <a href="" className="footer__button footer__button--facebook">
                            <IconFacebook />
                        </a>

                        <a href="" className="footer__button footer__button--twitter">
                            <IconTwitter />
                        </a>

                        <button type="button"
                                className="footer__button footer__button--iframe"
                                onClick={this.props.onModalClick}>
                            Copier le code d’intégration
                        </button>
                    </div>

                    <div className="footer__credits">
                        <span>Libre sur</span>
                        <a href="">
                            <IconGithub />
                        </a>
                        <span>et préparé par</span>
                        <a href="">
                            <IconEnMarche />
                        </a>
                    </div>
                </div>
            </footer>
        )
    }
};
