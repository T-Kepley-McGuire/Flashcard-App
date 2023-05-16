import React from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import EditDeck from "./EditDeck";
import AddCard from "../Cards/AddCard";
import ViewDeck from "./ViewDeck";
import StudyDeck from "./StudyDeck";
import NotFound from "../NotFound";
import EditCard from "../Cards/EditCard";

/*
    Component used exclusively to direct user via url to appropriate page
    Does not "display" anything
*/
function DeckDirector() {
    const {path, url} = useRouteMatch();
    return (
        <Switch>                          
            <Route exact path={`${path}`}>
                <ViewDeck />
            </Route>
            <Route path={`${path}/study`}>
                <StudyDeck />
            </Route>
            <Route path={`${path}/edit`}>
                <EditDeck />
            </Route>
            <Route path={`${path}/cards/new`}>
                <AddCard />
            </Route>
            <Route path={`${path}/cards/:cardId/edit`}>
                <EditCard />
            </Route>
            <Route>
                <NotFound />
            </Route>
        </Switch>
    )
}

export default DeckDirector;