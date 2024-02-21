import React, { useState } from "react";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const navigate = useNavigate();
  // State to hold the form data
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [rating, setRating] = useState("");
  const [formError, setFormError] = useState(null);

  // Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !method || !rating) {
      setFormError("Please fill in all fields");
      return;
    }

    try {
      // Add the new smoothie to the database
      const { data, error } = await supabase
        .from("smoothies")
        .insert([{ title, method, rating }]);

      if (error || !data) {
        setFormError("Please fill in all the fields correctly.");
      } else {
        console.log("Data inserted successfully:", data);
        // Clear the form
        setTitle("");
        setMethod("");
        setRating("");
        // Navigate to the home page
        navigate("/");
      }
    } catch (e) {
      console.log("Exception caught:", e);
    }
  };

  return (
    <div className="page create">
      <h2>Create</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Create Smoothie Recipe</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Create;
