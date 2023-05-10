import React from "react";

/*
  Takes various handles and data and builds a deck form from it.
  HandleSubmit --- called when user clicks Submit
  handleChange --- called whenever user changes info in input/textareas
  formData     --- data that the form displays. Must be object with
                   name and description keys and string values
  handleCancel --- called when user clicks Cancel
*/
function DeckForm({handleSubmit, handleChange, formData, handleCancel}) {
    if(formData) 
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name</label>

        <input
          className="form-control"
          id="name"
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
          placeholder="Deck Name"
        />
        <br />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          onChange={handleChange}
          value={formData.description}
          placeholder="Brief Description of the deck"
        />
      </div>
      <button className="btn btn-secondary cancel" onClick={handleCancel}>
        Cancel
      </button>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
  else return null;
}

export default DeckForm;
