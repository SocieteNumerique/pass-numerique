import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Home from './pages/home';
import Footer from './components/footer';

export default class App extends Component {
    render() {
        return (
            <div className="container">
                <div className="page">
                    <div className="content">
                        <Router>
                            <Home path="/" />
                        </Router>
                    </div>
                </div>

                <Footer />
            </div>
        )
    }
};
