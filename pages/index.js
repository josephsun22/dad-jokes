import { useState, useEffect, useCallback, useRef } from "react";
import SearchBar from "../components/SearchBar";
import GroupedJokes from "../components/GroupedJokes";
import RandomJoke from "@/components/RandomJoke";

export default function JokesPage() {
  const [term, setTerm] = useState("");
  const [searchJokes, setSearchJokes] = useState([]);
  const debounceRef = useRef(null);

  const fetchSearchJokes = useCallback(async (term) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/searchJokes?term=${term}`);
      const data = await response.json();
      setSearchJokes(data.jokes);
    } catch (error) {
      console.error("Error fetching jokes:", error);
      setSearchJokes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Clear previous timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set new timeout
    debounceRef.current = setTimeout(() => {
      if (term.trim()) {
        fetchSearchJokes(term);
      }
    }, 1000); // Type delay time here

    // Cleanup function to clear the timeout on unmount
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [term, fetchSearchJokes]);

  return (
    <div>
      <RandomJoke />
      <SearchBar searchTerm={term} setSearchTerm={setTerm} />

      <GroupedJokes jokes={searchJokes} term={term} />
   
    </div>
  );
}
