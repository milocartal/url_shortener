import { createClient } from 'redis';

const redisClient = createClient({
  url:'redis://default:redispw@localhost:32768'
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

redisClient.connect();

export default redisClient;