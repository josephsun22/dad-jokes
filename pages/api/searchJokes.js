import axios from 'axios';

export default async function handler(req, res) {
    const { limit = 30, term="time" } = req.query; // Set default limit to 30 if not provided
    console.log(`Received query parameters: limit=${limit}, term=${term}`); // Log query parameters
    try {
      const response = await axios.get(
        "https://icanhazdadjoke.com/search",
        {
          params: {
            limit,
            term
          },
          headers: {
            'Accept': 'application/json'
          },
        }
      );

      const jokes = response.data.results.map(item => item.joke);
      res.status(200).json({ jokes });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: "Failed to fetch data" });
      return;
    }
  }