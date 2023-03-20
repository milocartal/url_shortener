import redisClient from "./redis";

export default async function handlerRecup(req, res) {
    const { id } = req.body;
    
    const value = await redisClient.get(id);


    return res.status(200).json({ value : value });
  }