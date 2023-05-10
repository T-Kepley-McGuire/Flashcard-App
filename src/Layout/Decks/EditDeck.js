import React, { useState, useEffect } from "react";
import { Link, useHistory, useParams, useRouteMatch } from "react-router-dom";

import { updateDeck, readDeck } from "../../utils/api";
import DeckForm from "./DeckForm";

/*
  Edit Deck is the screen for changing name or description of given deck
  First deck is retrieved, then the form is set up with event listeners,
  then the form is called
*/
function EditDeck() {
  const { deckId } = useParams(); // Retrieve deckId from url
  const history = useHistory();

  // Form will be empty on initial load. This will be changed later
  const initialFormState = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const [currentDeck, setCurrentDeck] = useState({});

  // Load deck into currentDeck by accessing api thru readDeck
  useEffect(() => {
    const abortController = new AbortController();
    async function loadDeck() {
      try {
        // TRY SETTING CURRENTDECK WITH UTIL API THINGY
        const deck = await readDeck(deckId, abortController.signal);
        setCurrentDeck(deck);
        setFormData({ name: deck.name, description: deck.description });
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

  // On submit, send form data to api thru updateDeck
  const handleSubmit = (event) => {
    event.preventDefault();
    async function create() {
      setFormData({ ...initialFormState });
      const { id } = await updateDeck({ id: deckId, ...formData });
      history.push(`/decks/${id}`);
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
            &nbsp;/ Edit Deck
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2>Edit Deck</h2>
          <DeckForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            formData={formData}
            handleCancel={handleCancel}
          />
        </div>
      </div>
    </>
  );
}

export default EditDeck;
