import React from "react";

/*
  Takes various handles and data and builds a card form from it.
  HandleSubmit --- called when user clicks Submit
  handleChange --- called whenever user changes info in textareas
  formData     --- data that the form displays. Must be object with
                   front and back keys and string values
  handleCancel --- called when user clicks Cancel
*/
function CardForm({ handleSubmit, handleChange, formData, handleCancel }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="front">Front</label>

        <textarea
          className="form-control"
          id="front"
          name="front"
          onChange={handleChange}
          value={formData.front}
          placeholder="Front side of card"
        />
        <br />
      </div>
      <div className="form-group">
        <label htmlFor="back">Back</label>

        <textarea
          className="form-control"
          id="back"
          name="back"
          onChange={handleChange}
          value={formData.back}
          placeholder="Back side of card"
        />
        <br />
      </div>
      <button className="btn btn-secondary" onClick={handleCancel}>
        Cancel
      </button>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}

export default CardForm;
