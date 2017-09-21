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
                        Comment et où trouver mon revenu fiscal de référence ?
                    </h1>

                    <div className="modal__text">
                        Il est situé sur votre avis d'imposition, en haut à gauche de la premiere page. Dans un cadre intitulé "Vos références".
                    </div>

                    <div className="modal__text modal__text--small">
                        Ce montant est calculé pour votre foyer selon les revenus que vous déclarez, ainsi qu'en fonction des charges déductibles et abattements retenus dans le calcul de votre impôt sur le revenu.
                    </div>

                </div>
            </div>
        )
    }
};
