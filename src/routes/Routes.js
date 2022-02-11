import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Create from "../Components/Create";
import Header from "../Components/Header";
import Home from "../Components/Home";
import Update from "../Components/Update";

export default function Routes(params) {
  return (
    <BrowserRouter>
      <Header />
      <div style={{ marginTop: "50px" }}>
        <Switch>
          <Route exact path="/">
            {(props) => (
              <div className="parent">
                <Home {...props} />
              </div>
            )}
          </Route>
          <Route path="/create">
            {(props) => (
              <div className="parent">
                <Create {...props} />
              </div>
            )}
          </Route>
          <Route path="/update/:id">
            {(props) => (
              <div className="parent">
                <Update {...props} />
              </div>
            )}
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
