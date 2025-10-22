import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { propertyID } = req.query;
  const apiKey = process.env.RENTL_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Missing API key' });
  }

  try {
    const url = `https://api.rentl.io/public/availability/${propertyID}`;
    const response = await fetch(url, {
      headers: { 'x-api-key': apiKey },
    });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data', details: error.message });
  }
}
