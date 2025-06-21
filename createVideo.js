import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';

ffmpeg.setFfmpegPath(ffmpegPath);

export function generateVideo(audioPath, imagePath) {
  return new Promise((resolve, reject) => {
    const output = `/tmp/output-${Date.now()}.mp4`;
    ffmpeg()
      .input(imagePath)
      .loop(15)
      .input(audioPath)
      .outputOptions('-c:v libx264', '-preset veryfast', '-tune stillimage', '-shortest')
      .size('1280x720')
      .save(output)
      .on('end', () => resolve(output))
      .on('error', reject);
  });
}
