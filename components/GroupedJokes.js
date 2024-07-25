import { GoogleFonts } from "next-google-fonts";
import { highlightTerm } from "../utils/highlightTerm";
import { groupJokesByLength } from "../utils/groupJokesByLength";

const GroupedJokes = ({ jokes, term, searching, debouncing }) => {
  const groupedJokes = groupJokesByLength(jokes);

  const renderJokesList = (jokesList) =>
    jokesList.length > 0 ? (
      <ul className="list-disc list-inside space-y-1">
        {jokesList.map((joke, index) => (
          <li key={index} className="p-2 bg-gray-100 bg-opacity-10 rounded">
            {highlightTerm(joke, term)}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-center text-gray-600">Nothing to display...</p>
    );

  const renderContent = () => {
    if (debouncing) {
      return <p className="text-center text-gray-600">Typing...</p>;
    }
    if (searching) {
      return <p className="text-center text-gray-600">Searching...</p>;
    }
    if (!term) {
      return (
        <p className="text-center text-gray-600">Start typing to search!</p>
      );
    }
    return (
      <>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2 text-center">
            Short Jokes
          </h2>
          {renderJokesList(groupedJokes.Short)}
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2 text-center">
            Medium Jokes
          </h2>
          {renderJokesList(groupedJokes.Medium)}
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2 text-center">
            Long Jokes
          </h2>
          {renderJokesList(groupedJokes.Long)}
        </div>
      </>
    );
  };

  return (
    <>
      <GoogleFonts
        href="https://fonts.googleapis.com/css2?family=Cantarell:ital,wght@0,400;0,700;1,400;1,700&family=Cute+Font&display=swap"
        rel="stylesheet"
      >
        {" "}
      </GoogleFonts>
      <div
        className="flex justify-center min-h-screen bg-opacity-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(131, 126, 226, 1) 24%, rgba(114, 114, 226, 1) 58%, rgba(0, 212, 255, 1) 100%)",
        }}
      >
        <div className="w-[50vw] p-6 rounded-lg shadow-lg bg-white bg-opacity-10">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Search Results...
          </h1>
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default GroupedJokes;
