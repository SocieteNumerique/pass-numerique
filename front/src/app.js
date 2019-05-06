import { h, Component } from 'preact';
import { Router } from 'preact-router';

import Home from './pages/home';
import Community from './pages/community';
import Territory from './pages/territory';
import Result from './pages/result';
import NotFound from './pages/not-found';
import Disqualified from './pages/disqualified';
import Bonus from './pages/bonus';

export default class App extends Component {
    render() {
        return (
            <div className="container">
                <div className="page">
                    <div className="content">
                        <Router>
                            <Home path="/" />
                            <Home path="/pass-numerique" />
                            <Home path="/home/:territory/:scale/:previousBudget/:density?/:poverty?/:population?/:isTargetPublic?/:hasOrganizedLocally?/:hasHub?/:areOthersAssociated?/:hasEuFunds?" />
                            <Territory path="/territory/:territory/:scale/:previousBudget/:density?/:poverty?/:population?/:isTargetPublic?/:hasOrganizedLocally?/:hasHub?/:areOthersAssociated?/:hasEuFunds?" />
                            <Community path="/community/:territory/:scale/:previousBudget/:density/:poverty/:population/:isTargetPublic?/:hasOrganizedLocally?/:hasHub?/:areOthersAssociated?/:hasEuFunds?" />
                            <Bonus path="/bonus/:territory/:scale/:previousBudget/:density/:poverty/:population/:isTargetPublic/:hasOrganizedLocally/:hasHub?/:areOthersAssociated?/:hasEuFunds?" />
                            <Result path="/result/:territory/:scale/:previousBudget/:density/:poverty/:population/:isTargetPublic/:hasOrganizedLocally/:hasHub/:areOthersAssociated/:hasEuFunds" />
                            <Disqualified path="/disqualified" />
                            <NotFound default />
                        </Router>
                    </div>
                </div>
            </div>
        )
    }
};
