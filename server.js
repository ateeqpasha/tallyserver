import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const port = 5000;  // Ensure the proxy server runs on port 5000

app.use(cors());
app.use(express.text({ type: 'text/xml' })); // Use express.text for XML data

app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Define your proxy endpoint
app.post('/tally', async (req, res) => {
  const tallyUrl = 'http://localhost:9000'; // Replace with the actual TallyPrime URL

  try {
    const response = await fetch(tallyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/xml' },
      body: req.body,  // Forward the XML data from the React app to Tally
    });

    const result = await response.text();
    res.status(200).send(result);  // Send the result back to the React app
  } catch (error) {
    console.error('Error forwarding request to Tally:', error);
    res.status(500).send('Error forwarding request to Tally');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}`);
});