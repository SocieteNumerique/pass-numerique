import { h, Component } from 'preact';

export default class ModalExplainations extends Component {
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
                        TODO
                    </h1>

                    <div className="modal__subtitle">
                        TODO
                    </div>

                    <div className="modal__text">
                        TODO
                    </div>
                </div>
            </div>
        )
    }
};
