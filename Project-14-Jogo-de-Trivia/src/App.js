import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Config from './pages/Config';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/config" component={ Config } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
        <Route path="/game" component={ Game } />
      </Switch>
    </div>
  );
}
