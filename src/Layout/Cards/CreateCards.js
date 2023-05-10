import React from "react";
import { Link } from "react-router-dom";

/*
  Component in shape of a card with functionality to create deck.
  Intended for use on the home screen
*/
function CreateCards() {
  return (
    <div className="card deckView">
      <div className="card-body">
        <h4 className="card-title">New Deck</h4>
        <hr />
        <p className="card-text">Create new deck with various cards</p>
      </div>
      <div className="card-footer">
        <Link to="/decks/new" className="btn btn-secondary add">
          Create
        </Link>

      </div>
    </div>
  );
}

export default CreateCards;
