import { GoogleFonts } from "next-google-fonts";
import { useState, useEffect, useCallback, useRef } from "react";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import GroupedJokes from "../components/GroupedJokes";
import RandomJoke from "@/components/RandomJoke";

export default function JokesPage() {
  const [term, setTerm] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchJokes, setSearchJokes] = useState([]);
  const debounceRef = useRef(null);
  const [isDebouncing, setIsDebouncing] = useState(false);

  const fetchSearchJokes = useCallback(async (term) => {
    setSearching(true);
    try {
      const response = await fetch(`/api/searchJokes?term=${term}`);
      const data = await response.json();
      setSearchJokes(data.jokes);
    } catch (error) {
      console.error("Error fetching jokes:", error);
      setSearchJokes([]);
    } finally {
      setSearching(false);
    }
  }, []);

  useEffect(() => {
    // Clear previous timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set new timeout
    if (term.trim()) {
      setIsDebouncing(true);
      console.log("Debouncing started" + isDebouncing);
      debounceRef.current = setTimeout(() => {
        fetchSearchJokes(term);
        setIsDebouncing(false);
        console.log("Debouncing ended"+ isDebouncing);
      }, 1000); // Type delay time here
    } else {
      setIsDebouncing(false);
    }

    // Cleanup function to clear the timeout on unmount
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        setIsDebouncing(false);
      }
    };
  }, [term, fetchSearchJokes]);

  return (
    <div>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Cantarell:ital,wght@0,400;0,700;1,400;1,700&family=Cute+Font&display=swap" rel="stylesheet"> </GoogleFonts>
      <Hero />
      <RandomJoke />
      <SearchBar searchTerm={term} setSearchTerm={setTerm} />
      <GroupedJokes
        jokes={searchJokes}
        term={term}
        searching={searching}
        debouncing={isDebouncing}
      />
    </div>
  );
}
