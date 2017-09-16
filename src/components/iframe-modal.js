import { h, Component } from 'preact';

export default class IframeModal extends Component {
    render() {
        return (
            <div className="modal">
                <div className="modal__content">
                    <div className="modal__close">
                        <a href="javascript:void(0)"
                           onClick={(e) => { e.preventDefault(); this.props.onClose(); return false; }}>
                            Fermer
                        </a>
                    </div>

                    <h1 className="modal__title">
                        Code d’intégration
                    </h1>

                    <div className="modal__subtitle">
                        Copiez ce code et ajoutez-le
                        à votre site ou blog.
                    </div>

                    <div className="modal__field">
                        <textarea>&#x3C;iframe width=&#x22;560&#x22; height=&#x22;315&#x22; src=&#x22;https://www.youtube.com/embed/IT8Z6JIusdw&#x22; frameborder=&#x22;0&#x22; allowfullscreen&#x3E;&#x3C;/iframe&#x3E;</textarea>
                    </div>
                </div>
            </div>
        )
    }
};
