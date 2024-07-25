import React from "react";
import { useState, useEffect } from "react";

const RandomJoke = () => {
  const [randomJoke, setRandomJoke] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchRandomJoke = async () => {
    setLoading(true);
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
  };

  useEffect(() => {
    fetchRandomJoke(); // Fetch a joke on component mount
  }, []);


  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="mb-10 block text-center font-light text-6xl text-gray-700">
        Get Your Random Joke:
      </h1>
      <div className="w-[50vw] bg-white p-6 rounded-lg shadow-md  text-center">
        <div className="mb-4">
          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            <p className="text-lg text-gray-700">{randomJoke}</p>
          )}
        </div>
        <button
          onClick={fetchRandomJoke}
          disabled={loading}
          className={`text-white end-1.5 bottom-1.5 ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800'} focus:ring-4 text-lg  focus:outline-none font-light rounded-lg px-12 py-[9px]`}
        >
          {loading ? "Generating..." : "Generate Another !"}
        </button>
      </div>
    </div>
  );
};

export default RandomJoke;
