import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { listDecks, readDeck, deleteDeck } from "../../utils/api/index";
import CreateCards from "../Cards/CreateCards";

/*
  Renders all current decks to screen by retrieving all decks,
  then configuring deck info to cards.
  Intended to be displayed on home screen
*/
function DeckList() {
  const [allDecks, setAllDecks] = useState([]);

  // Load list of decks with api thru listDecks
  useEffect(() => {
    const abortController = new AbortController();
    async function loadDecks() {
      try {
        // TRY SETTING ALLDECKS WITH UTIL API THINGY
        const deckList = await listDecks(abortController.signal);
        setAllDecks(deckList);
      } catch (error) {
        // IF ABORT, TELL US
        if (error.name === "AbortError") console.log("Aborted Load Decks");
        else throw error;
      }
    }

    loadDecks();
    return () => {
      abortController.abort(); // CANCELS ANY PENDING REQUESTS
    };
  }, []);

  // Displays warning message before allowing user to delete deck with
  // id "id", and re-renders component
  const deleteHandler = (id) => {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      const abortController = new AbortController();
      async function deleteId() {
        try {
          await deleteDeck(id, abortController.signal);
          setAllDecks(allDecks.filter((deck) => deck.id !== id));
        } catch (error) {
          // IF ABORT, TELL US
          if (error.name === "AbortError") console.log("Aborted Load Decks");
          else throw error;
        }
      }

      deleteId();
      return () => {
        abortController.abort(); // CANCELS ANY PENDING REQUESTS
      };
    }
  };

  // Maps each card to a component displaying useful information
  const decksJSX = allDecks.map((deck, index) => {
    return (
      <div key={index} className="card deckView">
        <div className="card-body ">
          <div className="d-flex justify-content-between">
            <h4 className="card-title">{deck.name}</h4>
            <p className="ml-auto">{`${deck.cards.length} cards`}</p>
          </div>
          <hr />
          <p className="card-text">{deck.description}</p>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
            <i className="bi bi-eye"></i>&nbsp;View
          </Link>
          <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">
            <i className="bi bi-book"></i>&nbsp;Study
          </Link>
          <button
            onClick={() => deleteHandler(deck.id)}
            className="btn delete ml-auto"
          >
            <i className="bi bi-trash-fill"></i>&nbsp;Delete
          </button>
        </div>
      </div>
    );
  });

  return (
    <>
      <CreateCards />
      {decksJSX}
    </>
  );
}

export default DeckList;
