import React from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./Decks/DeckList";
import NewDeck from "./Decks/NewDeck";
import DeckDirector from "./Decks/DeckDirector";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <div className="row">
              <DeckList />
            </div>
          </Route>
          <Route path="/decks/new">
            <NewDeck />
          </Route>
          <Route path="/decks/:deckId">
            <DeckDirector />
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
