import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from "./page/Home";
import Auth from "./page/Auth";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/user/auth/:typeAuth">
          <Auth />
        </Route>
      </Switch>
    </Router>
  )
}