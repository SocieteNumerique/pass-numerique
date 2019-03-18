import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Home from './pages/home';
import Territory from './pages/territory';
import Result from './pages/result';
import NotFound from './pages/not-found';

export default class App extends Component {
    render() {
        return (
            <div className="container">
                <div className="page">
                    <div className="content">
                        <Router>
                            <Home path="/" />
                            <Territory path="/territory/:scale/:population/:density/:poverty/:previousBudget" />
                            <Result path="/result/:scale/:population/:density/:poverty/:previousBudget/:isRural/:isCityDistrict/:isCityHeart/:isOverseas/:isMountain" />
                            <NotFound default />
                        </Router>
                    </div>
                </div>
            </div>
        )
    }
};
