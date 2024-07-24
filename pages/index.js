import { useState, useEffect, useCallback } from "react";
import { highlightTerm } from '../utils/highlightTerm';

export default function JokesPage() {
  const [randomJoke, setRandomJoke] = useState("");
  const [term, setTerm] = useState("time");
  const [searchJokes, setSearchJokes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRandomJoke() {
      try {
        const response = await fetch("/api/randomJoke");
        const data = await response.json();
        setRandomJoke(data.joke);
      } catch (error) {
        console.error("Error fetching joke:", error);
        setRandomJoke("Failed to fetch joke");
      } finally {
        setLoading(false);
      }
    }

    fetchRandomJoke();
  }, []);

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

  return (
    <div>
      <h1>Show Random Dad Joke</h1>
      {loading ? <p>Loading...</p> : <p>{randomJoke}</p>}

      <h1>Show 30 jokes</h1>
      <ul>
        {searchJokes.map((joke, index) => (
          <li key={index}>{highlightTerm(joke, term)}</li>
        ))}
      </ul>
    </div>
  );
}
