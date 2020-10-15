import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';

function App() {

 const history = useHistory('/login');
    return (
        <div className="jumbotron">
            <div className="container">
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <Router history={history}>
                        <Switch>
                            <Route exact path="/home" component={HomePage} />
                            <Route exact  path="/login" component={LoginPage} />
                            <Route exact path="/register" component={RegisterPage} />
                            <Redirect from="*" to="/login" />
                        </Switch>
                    </Router>
                </div>
            </div>

    );
}

export { App };