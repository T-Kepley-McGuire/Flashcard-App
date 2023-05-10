import React, { useState, useEffect } from "react";
import { useParams, Link, useRouteMatch, useHistory } from "react-router-dom";

import { readDeck, deleteDeck, deleteCard } from "../../utils/api";

/*
  View Deck is the the "home" screen for each deck. Edit, Study, and other
  utilities are here, as well as card utilities. First deck is retirieved
  and loaded, then event listeners are set up for various buttons, then 
  the utilities and cards are rendered to screen
*/
function ViewDeck() {
  const history = useHistory();
  const { deckId } = useParams(); // Retrieve deckId
  const { url } = useRouteMatch();
  const [currentDeck, setCurrentDeck] = useState({});

  // Load deck into currentDeck by accessing api thru readDeck
  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        // TRY SETTING CURRENTDECK WITH UTIL API THINGY
        const deck = await readDeck(deckId, abortController.signal);
        setCurrentDeck(deck);
      } catch (error) {
        // IF ABORT, TELL US
        if (error.name === "AbortError")
          console.log("Aborted Load Single Deck");
        else throw error;
      }
    }

    loadDeck();
    return () => {
      abortController.abort(); // CANCELS ANY PENDING REQUESTS
    };
  }, []);

  // Handler for deleting deck. Gives warning message before letting user
  // delete, then sends user home
  const deleteHandler = (id) => {
    if (
      window.confirm("Delete this deck?\n\nYou will not be able to recover it.")
    ) {
      const abortController = new AbortController();
      async function deleteId() {
        try {
          await deleteDeck(id, abortController.signal);
          history.push("/");
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

  // Handler for deleting card with id "id". Gives user warning message before
  // letting user delete, then re-renders card list
  const deleteCardHandler = (id) => {
    if (
      window.confirm("Delete this card?\n\nYou will not be able to recover it.")
    ) {
      const abortController = new AbortController();
      async function deleteId() {
        try {
          await deleteCard(id, abortController.signal);
          setCurrentDeck({
            ...currentDeck,
            cards: currentDeck.cards.filter((card) => card.id !== id),
          });
        } catch (error) {
          // IF ABORT, TELL US
          if (error.name === "AbortError") console.log("Aborted Load Card");
          else throw error;
        }
      }

      deleteId();
      return () => {
        abortController.abort(); // CANCELS ANY PENDING REQUESTS
      };
    }
  };

  // Function used to render the list of cards, rendered as a list inside
  // a card componenent
  const renderCardList = () => {
    return currentDeck.cards.map((element, index) => {
      return (
        <li key={index} className="list-group-item">
          <div className="d-flex justify-content-between">
            <p>{element.front}</p>
            <p>{element.back}</p>
          </div>
          <div className="d-flex justify-content-between">
            <Link
              to={`${url}/cards/${element.id}/edit`}
              className="btn btn-secondary ml-auto"
            >
              <i className="bi bi-pencil" />
              &nbsp;Edit
            </Link>
            <button
              onClick={() => deleteCardHandler(element.id)}
              className="btn delete"
            >
              <i className="bi bi-trash-fill" />
            </button>
          </div>
        </li>
      );
    });
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <p className="breadcrumb">
            <Link to="/">
              <i className="bi bi-house-door"></i>&nbsp;Home
            </Link>
            &nbsp;/ {currentDeck.name}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h4>{currentDeck.name}</h4>
          <p>{currentDeck.description}</p>
        </div>
      </div>
      <div className="row">
        <div className="col d-flex justify-content-between">
          <Link to={`${url}/edit`} className="btn btn-secondary">
            <i className="bi bi-pencil" />
            &nbsp;Edit
          </Link>
          <Link to={`${url}/study`} className="btn btn-primary">
            <i className="bi bi-book" />
            &nbsp;Study
          </Link>
          <Link to={`${url}/cards/new`} className="btn btn-primary">
            <i className="bi bi-plus-circle" />
            &nbsp;Add Cards
          </Link>
          <button
            onClick={() => deleteHandler(currentDeck.id)}
            className="btn delete ml-auto"
          >
            <i className="bi bi-trash-fill" />
            &nbsp;Delete
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <hr />
          <h3>Cards</h3>
          <div className="card">
            <div className="card-body">
              <ul className="list-group list-group-flush">
                {currentDeck.cards && renderCardList()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewDeck;
