import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

import { readDeck } from "../../utils/api";

/*
  Study Deck is the screen for viewing deck cards one by one front to back
  First retrieve deck, then retrieve card from state, starting at 0, then
  render card with options to flip card, then with options to go to next 
  card after flipping
*/
function StudyDeck() {
  const { deckId } = useParams(); // Retrieve deckId
  const [currentDeck, setCurrentDeck] = useState({});
  const history = useHistory();
  const deckUrl = `/decks/${deckId}`; // Used to send user home on completion

  // cardState is set to 0 index and unflipped to begin with
  const [cardState, setCardState] = useState({ index: 0, flip: false });

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

  // "flips" cardState front/back
  const flip = (id) => {
    setCardState({ ...cardState, flip: !cardState.flip });
  };

  // Goes to next card by changing cardState index, or if deck is
  // completed, gives user option to restart or go home
  const next = (id) => {
    if (
      cardState.index >= currentDeck.cards.length - 1 &&
      window.confirm(
        "Restart cards?\n\nClick 'cancel' to return to the home page"
      )
    ) {
      setCardState({ index: 0, flip: false });
    } else if (cardState.index < currentDeck.cards.length - 1) {
      setCardState({ index: cardState.index + 1, flip: false });
    } else {
      history.push("/");
    }
  };

  // Function for rendering current card to screen. Displays only front
  // if card is not flipped, only back if card is flipped. Displays a
  // message if the deck length is less than 3
  const cardList = () => {
    if (currentDeck.cards) {
      if (currentDeck.cards.length >= 3) {
        return (
          <div className="card cardView">
            <div className="card-body">
              <h4 className="card-text">
                Card {cardState.index + 1} of {currentDeck.cards.length}
              </h4>
              <p>
                {cardState.flip
                  ? currentDeck.cards[cardState.index].back
                  : currentDeck.cards[cardState.index].front}
              </p>
            </div>
            <div className="card-footer">
              <button
                onClick={() => flip(currentDeck.cards[cardState.index].id)}
                className="btn btn-secondary"
              >
                Flip
              </button>
              {cardState.flip && (
                <button
                  onClick={() => next(currentDeck.cards[cardState.index].id)}
                  className="btn btn-primary"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <h3>Not enough cards.</h3>
            <p>
              You need at least 3 cards to study. There are{" "}
              {currentDeck.cards.length} cards in this deck.
            </p>
            <Link to={`${deckUrl}/add`} className="btn btn-primary">
              <i className="bi bi-plus-circle" />
              &nbsp;Add Cards
            </Link>
          </div>
        );
      }
    }
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <p className="breadcrumb">
            <Link to="/">Home</Link>&nbsp;/&nbsp;
            <Link to={`/decks/${deckId}`}>{currentDeck.name}</Link>&nbsp; /
            Study
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2>{currentDeck.name}: Study</h2>
        </div>
      </div>
      <div className="row">
        <div className="col d-flex">{cardList()}</div>
      </div>
    </>
  );
}

export default StudyDeck;
