import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { StoreProvider } from './store/store';
import Landing from './views/containers/Landing';
import Home from './views/containers/Home';
import * as serviceWorker from './serviceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/index.scss';

ReactDOM.render(
    <StoreProvider>
        <Router>
            <Switch>
                <Route exact path="/">
                    <Landing />
                </Route>
                <Route path="/home">
                    <Home />
                </Route>
            </Switch>
        </Router>
    </StoreProvider>
    , document.getElementById('root'));

serviceWorker.unregister();
