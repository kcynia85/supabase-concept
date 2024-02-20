import supabase from "../config/supabaseClient";
import { useState, useEffect } from "react";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [smoothies, setSmoothies] = useState(null);

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select("*");
      if (error) {
        setFetchError(error);
      } else {
        setSmoothies(data);
      }
    };
    fetchSmoothies();
  };

  return (
    <div className="page home">
      <h2>Home</h2>
    </div>
  );
};

export default Home;