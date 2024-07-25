import { useState, useEffect, useCallback } from "react";
import SearchBar from "../components/SearchBar";
import GroupedJokes from "../components/GroupedJokes";
import RandomJoke from "@/components/RandomJoke";

export default function JokesPage() {
  const [term, setTerm] = useState("time");
  const [loading, setLoading] = useState(true);
  const [searchJokes, setSearchJokes] = useState([]);

  useEffect(() => {
    async function fetchSearchJokes() {
      try {
        const response = await fetch(`/api/searchJokes?term=${term}`);
        const data = await response.json();
        setSearchJokes(data.jokes);
      } catch (error) {
        console.error("Error fetching joke:", error);
        setSearchJokes("Failed to fetch joke");
      } finally {
        setLoading(false);
      }
    }

    fetchSearchJokes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search Term:", searchTerm);
    // Handle the search operations
  };

  return (
    <div>
    <RandomJoke />
    <SearchBar
        searchTerm={term}
        setSearchTerm={setTerm}
        handleSubmit={handleSubmit}
      />
      {loading ? (
        <p className="h-[100vh]">Loading...</p>
      ) : (
        <GroupedJokes jokes={searchJokes} term={term} />
      )}
    </div>
  );
}
