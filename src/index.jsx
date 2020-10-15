import React from 'react';
// import React from 'react';
// import { Route } from 'react-router-dom';
import { Router, Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

// import { store } from './_helpers';
import { App } from './App';

// setup fake backend
// import { configureFakeBackend } from './_helpers';
// configureFakeBackend();

render(
    // <Provider store={store}>
    // <Router history={history}>
    <BrowserRouter><App/></BrowserRouter>
    // <Route path={`/`} component={App} />
//   </Router>
    ,
    // </Provider>,
    document.getElementById('app')
);

export default ReactRouter;