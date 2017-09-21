import { h, Component } from 'preact';
import { Router } from 'preact-router';

import ModalIframe from './components/modal-iframe';
import ModalExplainations from './components/modal-explainations';
import Footer from './components/footer';

import Home from './pages/home';
import Exoneration from './pages/exoneration';
import NoExoneration from './pages/no-exoneration';
import Result from './pages/result';

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalIframe: false,
            modalExplainations: false,
        };
    }

    render() {
        return (
            <div className="container">
                {!this.state.modalIframe ? '' : (
                    <ModalIframe onClose={() => {
                        this.setState({ modalIframe: false });
                    }} />
                )}

                {!this.state.modalExplainations ? '' : (
                    <ModalExplainations onClose={() => {
                        this.setState({ modalExplainations: false });
                    }} />
                )}

                {(this.state.modalIframe || this.state.modalExplainations) ? '' : (
                    <div className="page">
                        <div className="content">
                            <Router>
                                <Home path="/" onExplainationsClick={() => {
                                    this.setState({ modalExplainations: !this.state.modalExplainations });
                                }} />

                                <Exoneration path="/exoneration/:status/:dependents/:income" />
                                <NoExoneration path="/no-exoneration" />
                                <Result path="/result/:tax2018/:tax2019/:tax2020" />
                            </Router>
                        </div>
                    </div>
                )}

                <Footer onModalClick={() => {
                    this.setState({ modalIframe: !this.state.modalIframe });
                }} />
            </div>
        )
    }
};
