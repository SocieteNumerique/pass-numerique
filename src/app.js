import { h, Component } from 'preact';
import { Router } from 'preact-router';

import IframeModal from './components/iframe-modal';
import Footer from './components/footer';

import Home from './pages/home';
import Exoneration from './pages/exoneration';
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
                                <Exoneration path="/exoneration/:status/:dependents/:income" />
                                <NoExoneration path="/no-exoneration" />
                                <Result path="/result/:tax2018/:tax2019/:tax2020" />
                            </Router>
                        </div>
                    </div>
                )}

                <Footer onModalClick={() => { this.setState({ modal: !this.state.modal }); }} />
            </div>
        )
    }
};
