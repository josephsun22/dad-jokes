import { useState, useEffect, useCallback, useRef } from "react";
import SearchBar from "@/components/SearchBar";
import GroupedJokes from "@/components/GroupedJokes";
import GoHomeButton from "@/components/GoHomeButton";

export default function Search() {
  const [term, setTerm] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchJokes, setSearchJokes] = useState([]);
  const debounceRef = useRef({ timer: null, isDebouncing: false });

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
    if (debounceRef.current.timer) {
      clearTimeout(debounceRef.current);
    }

    // Set new timeout
    if (term.trim()) {
      debounceRef.current.isDebouncing = true;
      console.log("Debouncing started");
      debounceRef.current.timer = setTimeout(() => {
        fetchSearchJokes(term);
        debounceRef.current.isDebouncing = false;
        console.log("Debouncing ended");
      }, 1000); // Type delay time here
    } else {
      debounceRef.current.isDebouncing = false;
    }

    // Cleanup function to clear the timeout on unmount
    return () => {
      if (debounceRef.current.timer) {
        clearTimeout(debounceRef.current.timer);
        debounceRef.current.isDebouncing = false;
      }
    };
  }, [term, fetchSearchJokes]);

  return (
    <>
      <SearchBar searchTerm={term} setSearchTerm={setTerm} />
      <GroupedJokes
        jokes={searchJokes}
        term={term}
        searching={searching}
        debouncing={debounceRef.current.isDebouncing}
      />
      <GoHomeButton />
    </>
  );
};
