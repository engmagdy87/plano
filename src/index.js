import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import Home from './views/containers/Home';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/index.scss';

ReactDOM.render(
    <Router>
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
        </Switch>
    </Router>
    , document.getElementById('root'));

serviceWorker.unregister();
