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
    <div className="flex flex-col items-center justify-center bg-gray-50 p-6" style={{
      background: "linear-gradient(90deg, rgba(131, 126, 226, 1) 24%, rgba(114, 114, 226, 1) 58%, rgba(0, 212, 255, 1) 100%)"
    }}>
      <h1 className="mb-10 block text-center font-light text-5xl text-gray-900">
        Grab a Random Joke From Here
      </h1>
      <div className="w-[50vw] bg-white bg-opacity-10 p-6 rounded-lg shadow-md  text-center">
        <div className="mb-4">
          {loading ? (
            <p className="text-gray-900">Loading...</p>
          ) : (
            <p className="text-2xl text-gray-900">{randomJoke}</p>
          )}
        </div>
        <button
          onClick={fetchRandomJoke}
          disabled={loading}
          className="ml-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full py-4 px-8 transition-transform duration-200 transform hover:-translate-y-1 shadow-lg"
>
          {loading ? "Generating..." : "Generate Another !"}
        </button>
      </div>
    </div>
  );
};

export default RandomJoke;
