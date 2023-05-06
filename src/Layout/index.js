import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";
import CreateCards from "./Cards/CreateCards";
import DeckList from "./Cards/DeckList";
import Decks from "./Cards/Decks";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            {/* TODO: Implement the screen starting here */}
            <div className="row">
              <CreateCards />
            </div>
            <div className="row">
              <DeckList />
            </div>
          </Route>
          <Route path="/decks">
            <Decks />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
