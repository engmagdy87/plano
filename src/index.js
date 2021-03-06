import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { StoreProvider } from './store/store';
import Landing from './views/containers/Landing';
import Home from './views/containers/Home';
import Profile from './views/containers/Profile';
import BuildProfile from './views/containers/BuildProfile';
import AdminPanel from './views/containers/AdminPanel';
import Sections from './views/containers/Sections';
import ForgotPassword from './views/containers/ForgotPassword';
import ResetPassword from './views/containers/ResetPassword';
import * as serviceWorker from './serviceWorker';
import './helpers/i18n';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/index.scss';

ReactDOM.render(
    <Suspense fallback={null}>
        <StoreProvider>
            <Router>
                <Switch>
                    <Route path="/home">
                        <Home />
                    </Route>
                    <Route path="/profile">
                        <Profile />
                    </Route>
                    <Route path="/build-profile">
                        <BuildProfile />
                    </Route>
                    <Route path="/sections">
                        <Sections />
                    </Route>
                    <Route path="/forgot">
                        <ForgotPassword />
                    </Route>
                    <Route path="/reset/:hash">
                        <ResetPassword />
                    </Route>
                    <Route exact path="/admin">
                        <AdminPanel />
                    </Route>
                    <Route exact path="/">
                        <Landing />
                    </Route>
                    <Route exact path="*">
                        <Landing />
                    </Route>
                </Switch>
            </Router>
        </StoreProvider>
    </Suspense>
    , document.getElementById('root'));

serviceWorker.unregister();
