'use strict';
// import react module
import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

// import redux module
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

import Main from './components/Main';
import Tracking from './components/Tracking';
import reducers from './reducers';

const middleware = applyMiddleware(thunk, logger);
const store = createStore(reducers, middleware);
const Routes = (
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Main}>
                <IndexRoute component={Tracking}/>

            </Route>
        </Router>
    </Provider>
);

render(
    Routes,
    document.getElementById('app')
);