import { useState, useEffect, useCallback } from "react";
import { highlightTerm } from "../utils/highlightTerm";
import { groupJokesByLength } from "../utils/groupJokesByLength";
import SearchBar from "../components/SearchBar";

export default function JokesPage() {
  const [term, setTerm] = useState("time");
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
        // setLoading(false);
      }
    }

    fetchSearchJokes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Search Term:', searchTerm);
    // Handle the search operations
  };

  const groupedJokes = groupJokesByLength(searchJokes);

  return (
    <div>
      <SearchBar
        searchTerm={term}
        setSearchTerm={setTerm}
        handleSubmit={handleSubmit}
      />

      <h1>Show 30 jokes</h1>
      <h2>Short Jokes</h2>
      <ul>
        {groupedJokes.Short.map((joke, index) => (
          <li key={index}>{highlightTerm(joke, term)}</li>
        ))}
      </ul>

      <h2>Medium Jokes</h2>
      <ul>
        {groupedJokes.Medium.map((joke, index) => (
          <li key={index}>{highlightTerm(joke, term)}</li>
        ))}
      </ul>

      <h2>Long Jokes</h2>
      <ul>
        {groupedJokes.Long.map((joke, index) => (
          <li key={index}>{highlightTerm(joke, term)}</li>
        ))}
      </ul>
    </div>
  );
}
