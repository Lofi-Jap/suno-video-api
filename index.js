import express from 'express';
import { generateSuno } from './generate.js';
import { generateImage } from './image.js';
import { generateVideo } from './createVideo.js';
import path from 'path';

const app = express();
app.use(express.json());

app.post('/run', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Missing prompt' });

    const mp3Path = await generateSuno(prompt);
    const imgPath = await generateImage(prompt);
    const mp4Path = await generateVideo(mp3Path, imgPath);

    res.json({ mp3: mp3Path, image: imgPath, video: mp4Path });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message });
  }
});

app.listen(process.env.PORT || 3000, () => console.log('🎵 Suno Video API en ligne'));
