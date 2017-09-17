import { h, Component } from 'preact';
import { Router } from 'preact-router';

import IframeModal from './components/iframe-modal';
import Footer from './components/footer';

import Home from './pages/home';
import Congratulations from './pages/congratulations';
import NoExoneration from './pages/no-exoneration';
import Result from './pages/result';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false
        };
    }

    render() {
        return (
            <div className="container">
                {this.state.modal ? <IframeModal onClose={() => { this.setState({ modal: false }); }} /> : ''}

                {this.state.modal ? '' : (
                    <div className="page">
                        <div className="content">
                            <Router>
                                <Home path="/" />
                                <Congratulations path="/congratulations/:status/:dependents/:income" />
                                <NoExoneration path="/no-exoneration" />
                                <Result path="/result" />
                            </Router>

                            <div className="legalities">
                                Le calcul effectué est purement anonyme et n’a qu’une valeur indicative.
                                Il dépend uniquement des éléments en notre possession et ne préjuge en rien
                                du montant qui sera finalement retenu par l’administration fiscale.
                            </div>
                        </div>
                    </div>
                )}

                <Footer onModalClick={() => { this.setState({ modal: !this.state.modal }); }} />
            </div>
        )
    }
};
