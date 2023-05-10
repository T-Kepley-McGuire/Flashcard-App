import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { createDeck } from "../../utils/api";
import DeckForm from "./DeckForm";

/*
  New Deck is the screen for creating a new deck (just name and description)
  The form is set up with event listeners, then the form is called
*/
function NewDeck() {
  const history = useHistory();
  
  // Form will be empty on initial load
  const initialFormState = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  
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
      const { id } = await createDeck(formData);
      history.push(`/decks/${id}`);
    }
    create();
  };

  // On cancel, send user back to home screen
  const handleCancel = () => {
    history.push(`/`);
  };

  return (
    <>
      <div className="row">
        <div className="col">
          <p className="breadcrumb">
            <Link to="/">
              <i className="bi bi-house-door"></i>&nbsp;Home
            </Link>
            &nbsp;/ Create Deck
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2>Create Deck</h2>
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

export default NewDeck;
