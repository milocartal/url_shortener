const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');

const app = express();
const client = redis.createClient();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.post('/shorten', (req, res) => {
  const { url } = req.body;

  const code = shortid.generate();

  client.set(`url:${code}`, url, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error generating shortened URL');
    } else {
      res.send(`http://localhost:${PORT}/${code}`);
    }
  });
});

app.get('/:code', (req, res) => {
  const { code } = req.params;

  // TODO: Retrieve the original URL from Redis using the code and redirect the user to it

  res.send('Original URL retrieved');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});