import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

import { readDeck, updateCard, readCard } from "../../utils/api";
import CardForm from "./CardForm";

/*
  Eit Card is the screen for editing a card into a given deck
  First deck is retrieved, then the specific card is retrieved,
  then the form is set up with event listeners, then the form is called
*/
function EditCard() {
  const history = useHistory();
  const { deckId, cardId } = useParams(); // Retrieve deck id from url
  const [currentDeck, setCurrentDeck] = useState({});

  // Form will be empty on initial load
  const initialFormState = {
    id: -1, // set id to a non-existent id. This will be updated later
    front: "",
    back: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });

  // Load deck into currentDeck by accessing api thru readDeck
  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        // TRY SETTING CURRENTDECK WITH UTIL API THINGY
        const deck = await readDeck(deckId, abortController.signal);
        setCurrentDeck(deck);

        console.log("I loaded the deck", deck);
      } catch (error) {
        // IF ABORT, TELL US
        if (error.name === "AbortError")
          console.log("Aborted Load Single Deck");
        else throw error;
      }
    }

    loadDeck();
    return () => {
      console.log("Cleanup Load Single Deck");
      abortController.abort(); // CANCELS ANY PENDING REQUESTS
    };
  }, []);

  // Load card into form data by accessing api thru readCard
  useEffect(() => {
    const abortController = new AbortController();
    async function loadCard() {
      try {
        // TRY SETTING CURRENTDECK WITH UTIL API THINGY
        const card = await readCard(cardId, abortController.signal);
        setFormData({ ...card });

      } catch (error) {
        // IF ABORT, TELL US
        if (error.name === "AbortError")
          console.log("Aborted Load Single Card");
        else throw error;
      }
    }

    loadCard();
    return () => {
      abortController.abort(); // CANCELS ANY PENDING REQUESTS
    };
  }, []);

  // Update form field that was changed based on what was typed
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  // On submit, send form data to api thru updateCard, 
  // then send user to deck screen
  const handleSubmit = (event) => {
    event.preventDefault();
    async function create() {
      setFormData({ ...initialFormState }); // Reset form
      await updateCard(formData);
      history.push(`/decks/${deckId}`);
    }
    create();
  };

  // On cancel, send user back to deck screen
  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <p className="breadcrumb">
            <Link to="/">
              <i className="bi bi-house-door"></i>&nbsp;Home
            </Link>
            &nbsp;/&nbsp;
            <Link to={`/decks/${deckId}`}>{currentDeck.name}</Link>
            &nbsp;/ Edit Card {cardId}
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h3>Edit Card</h3>
          <CardForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            formData={formData}
            handleCancel={handleCancel}
          />
        </div>
      </div>
    </>
  );
}

export default EditCard;
