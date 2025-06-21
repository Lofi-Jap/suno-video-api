import fetch from 'node-fetch';
import fs from 'fs';

export async function generateImage(prompt) {
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1024x1024'
    })
  });
  const data = await response.json();
  const imageUrl = data.data[0].url;
  const res = await fetch(imageUrl);
  const buffer = await res.buffer();
  const filePath = `/tmp/image-${Date.now()}.png`;
  fs.writeFileSync(filePath, buffer);
  return filePath;
}
