import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Home from './pages/home';
import Exoneration from './pages/exoneration';
import NoExoneration from './pages/no-exoneration';
import Result from './pages/result';
import NotFound from './pages/not-found';

export default class App extends Component {
    render() {
        return (
            <div className="container">
                <div className="page">
                    <div className="content">
                        <Router>
                            <Home path="/" onExplainationsClick={() => {
                                this.setState({ modalExplainations: !this.state.modalExplainations });
                            }} />

                            <Exoneration path="/exoneration/:status/:dependents/:income" />
                            <NoExoneration path="/no-exoneration" />
                            <Result path="/result/:tax2018/:tax2019/:tax2020" />
                            <NotFound default />
                        </Router>
                    </div>
                </div>
            </div>
        )
    }
};
