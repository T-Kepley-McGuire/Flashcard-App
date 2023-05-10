import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

import { readDeck, createCard } from "../../utils/api";
import CardForm from "./CardForm";

/*
  Add Card is the screen for inserting a new card into a given deck
  First deck is retrieved, then the form is set up with event listeners,
  then the form is called
*/
function AddCard() {
  const history = useHistory();
  const { deckId } = useParams(); // Retrieve deck id from url
  const [currentDeck, setCurrentDeck] = useState({});

  // Form will be empty on initial load
  const initialFormState = {
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

  // Update form field that was changed based on what was typed
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  // On submit, send form data to api thru createCard
  const handleSubmit = (event) => {
    event.preventDefault();
    async function create() {
      setFormData({ ...initialFormState }); // Reset form
      await createCard(deckId, formData);
    }
    create();
  };

  // On cancel, send user back to deck screen
  const handleCancel = () => {
    history.push(`/decks/${deckId}`);
  }

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
            &nbsp;/ Add Card
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h3>{currentDeck.name}:</h3>
          <h3>Add Card</h3>
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

export default AddCard;
