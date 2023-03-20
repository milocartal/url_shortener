import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import useSWR from "swr"


const inter = Inter({ subsets: ['latin'] })
//{ data: user } = useSWR(‘/api/user’, { refreshInterval: 2000 })

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post('/api/shorten', { url });
    setShortUrl(response.data.shortUrl);
    console.log('caca ',response.data.shortUrl)
  };

  return (
    <div>
      <h1>URL Shortener 2000</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={url} onChange={handleUrlChange} placeholder="Your URL"/>
        <button type="submit">Shorten</button>
      </form>

      {shortUrl && (
        <div>
          <p>Short URL:</p>
          <a target="_blank" href={shortUrl}>{shortUrl}</a>
        </div>
      )}
    </div>
  );
}
