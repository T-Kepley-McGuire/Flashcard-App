import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { listDecks, readDeck, deleteDeck } from "../../utils/api/index";

function DeckList() {
  const [allDecks, setAllDecks] = useState([]);

  // RUN USE EFFECT ON RENDER TO LOAD THE LIST OF DECKS
  useEffect(() => {
    const abortController = new AbortController();
    async function loadDecks() {
      try {
        // TRY SETTING ALLDECKS WITH UTIL API THINGY
        const deckList = await listDecks(abortController.signal);
        setAllDecks(deckList);
        console.log("I set all the decks to be", deckList);
      } catch (error) {
        // IF ABORT, TELL US
        if (error.name === "AbortError") console.log("Aborted Load Decks");
        else throw error;
      }
    }

    loadDecks();
    return () => {
      console.log("Cleanup Load Decks");
      abortController.abort(); // CANCELS ANY PENDING REQUESTS
    };
  }, []);

  const deleteHandler = (id) => {
    if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")) {
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
        console.log("Cleanup Delete Decks");
        abortController.abort(); // CANCELS ANY PENDING REQUESTS
      };
    }
  };

  const decksJSX = allDecks.map((deck, index) => {
    return (
      <div key={index} className="card">
        <div className="card-body">
          <h4 className="card-title">{deck.name}</h4>
          <hr />
          <p className="card-text">{deck.description}</p>
        </div>
        <div className="card-footer d-flex justify-content-between">
          <Link to={`/decks/${deck.id}`} className="btn btn-secondary">
            View
          </Link>
          <Link to={`/study/${deck.id}`} className="btn btn-primary">
            Study
          </Link>
          <button
            onClick={() => deleteHandler(deck.id)}
            className="btn delete ml-auto"
          >
            Delete
          </button>
        </div>
      </div>
    );
  });

  return <>{decksJSX}</>;
}

export default DeckList;
