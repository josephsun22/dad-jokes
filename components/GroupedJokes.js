import React from "react";
import { highlightTerm } from "../utils/highlightTerm";
import { groupJokesByLength } from "../utils/groupJokesByLength";

const GroupedJokes = ({ jokes, term, searching}) => {
  const groupedJokes = groupJokesByLength(jokes);

  const renderJokesList = (jokesList) => (
    jokesList.length > 0 ? (
      <ul className="list-disc list-inside space-y-1">
        {jokesList.map((joke, index) => (
          <li key={index} className="p-2 bg-gray-100 rounded">
            {highlightTerm(joke, term)}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-center text-gray-600">Nothing to display...</p>
    )
  );

  const renderContent = () => {
    if (searching) {
      return <p className="text-center text-gray-600">Searching...</p>;
    }
    if (!term) {
      return <p className="text-center text-gray-600">Start typing to search!</p>;
    }
    return (
      <>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2 text-center">Short Jokes</h2>
          {renderJokesList(groupedJokes.Short)}
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2 text-center">Medium Jokes</h2>
          {renderJokesList(groupedJokes.Medium)}
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2 text-center">Long Jokes</h2>
          {renderJokesList(groupedJokes.Long)}
        </div>
      </>
    );
  };

  return (
    <div className="flex justify-center min-h-screen bg-gray-50">
      <div className="w-[50vw] p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">Search Results...</h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default GroupedJokes;

