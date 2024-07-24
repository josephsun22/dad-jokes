import React from "react";

const RandomJoke = () => {
  const [randomJoke, setRandomJoke] = useState("");
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

  return (
    <>
      <h1>Show Random Dad Joke</h1>
      {loading ? <p>Loading...</p> : <p>{randomJoke}</p>}
    </>
  );
};

export default RandomJoke;
