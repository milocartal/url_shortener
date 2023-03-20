import shortid from 'shortid';
import redisClient from './redis';

export default async function handler(req, res) {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'No URL provided' });
  }

  const id = shortid.generate();
  const shortUrl = `${process.env.BASE_URL}/${id}`;
  console.log(id);

  const result = await redisClient.set(id, url);
    return res.status(200).json({ shortUrl });
}