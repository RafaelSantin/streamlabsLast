import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Streamer from './Streamer';
import * as serviceWorker from './serviceWorker';
import './bootstrap.min.css';
import './geral.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={App} />
            <Route path="/streamer" component={Streamer} />
        </Switch>
    </BrowserRouter>
        , document.getElementById('root'));

serviceWorker.unregister();
