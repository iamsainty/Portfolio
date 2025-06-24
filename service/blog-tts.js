import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
import { uploadBlogTTS } from "./uploadToAWS";
import ffmpeg from "fluent-ffmpeg";
import fs from "fs/promises";
import path from "path";
import os from "os";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const ffmpegPath = require("ffmpeg-static");

ffmpeg.setFfmpegPath(ffmpegPath);
const pollyClient = new PollyClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

export async function generateBlogTTS(title, content, permalink) {
  try {
    const text = textForTTS(title, content);

    const chunks = splitTextIntoChunks(text);

    const audioBuffers = [];

    for (const chunk of chunks) {
      const command = new SynthesizeSpeechCommand({
        Engine: "neural",
        LanguageCode: "en-IN",
        OutputFormat: "mp3",
        Text: chunk,
        VoiceId: "Kajal",
      });

      const { AudioStream } = await pollyClient.send(command);

      if (!AudioStream) throw new Error("AudioStream is null");

      const buffer = await streamToBuffer(AudioStream);

      audioBuffers.push(buffer);
    }

    const mergedAudioBuffer = await mergeAudioBuffers(audioBuffers, permalink);

    const audioUrl = await uploadBlogTTS(mergedAudioBuffer, permalink);

    return audioUrl;
  } catch (error) {
    console.error("Error generating blog TTS:", error);
    return null;
  }
}

async function mergeAudioBuffers(buffersArray, permalink) {
  const tempDir = path.join(os.tmpdir(), `audio-chunks-${permalink}`);
  const inputFiles = [];

  try {
    // Ensure dir exists
    await fs.mkdir(tempDir, { recursive: true });

    // Write each chunk to a file
    for (let i = 0; i < buffersArray.length; i++) {
      const filePath = path.join(tempDir, `chunk-${i}.mp3`);
      await fs.writeFile(filePath, buffersArray[i]);
      inputFiles.push(filePath);
    }

    // Write ffmpeg concat file
    const concatListPath = path.join(tempDir, "concat-list.txt");
    const concatListContent = inputFiles
      .map((file) => `file '${file}'`)
      .join("\n");
    await fs.writeFile(concatListPath, concatListContent);

    const outputFilePath = path.join(tempDir, `merged-${permalink}.mp3`);

    // Merge using ffmpeg
    await new Promise((resolve, reject) => {
      ffmpeg()
        .input(concatListPath)
        .inputOptions(["-f", "concat", "-safe", "0"])
        .outputOptions(["-c", "copy"])
        .on("start", (cmd) => console.log("ffmpeg cmd:", cmd))
        .on("error", (err) => reject(err))
        .on("end", () => resolve())
        .save(outputFilePath);
    });

    const mergedBuffer = await fs.readFile(outputFilePath);

    // Cleanup
    await fs.rm(tempDir, { recursive: true, force: true });

    return mergedBuffer;
  } catch (error) {
    console.error("Error merging audio buffers:", error);
    return null;
  }
}

function splitTextIntoChunks(text, maxChunkLength = 2500) {
  const sentences = text.match(/[^.!?\n]+[.!?\n]+|.+$/g);
  const chunks = [];
  let currentChunk = "";

  for (const sentence of sentences) {
    if (sentence.length > maxChunkLength) {
      const words = sentence.split(" ");
      for (const word of words) {
        if ((currentChunk + " " + word).trim().length > maxChunkLength) {
          chunks.push(currentChunk.trim());
          currentChunk = word;
        } else {
          currentChunk += " " + word;
        }
      }
    } else {
      if ((currentChunk + sentence).length > maxChunkLength) {
        chunks.push(currentChunk.trim());
        currentChunk = sentence;
      } else {
        currentChunk += sentence;
      }
    }
  }

  if (currentChunk.trim()) chunks.push(currentChunk.trim());

  return chunks;
}

function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });
}

function textForTTS(title, content) {
  const parsedContent = parseContent(JSON.parse(content));
  return `
  Hello! I hope you're doing well. Thanks for visiting Hey Sainty. 
  Today, I’ll be reading the blog with the title: "${title}" for you.
  
  ${parsedContent}
  
  That’s all for this blog. Thanks for listening on Hey Sainty! 
  I hope you enjoyed it and found it helpful. See you in the next one!
    `;
}

function parseContent(content) {
  try {
    if (!content || !Array.isArray(content.blocks)) return "";

    return content.blocks
      .map((block, index) => {
        const { type, data } = block;

        switch (type) {
          case "header":
            return `\n${stripHTML(data.text)}\n`;

          case "paragraph":
            return `${stripHTML(data.text)}\n`;

          case "list":
            const items = data.items.map((item, idx) => {
              const text = item?.content || item;
              return `${
                data.style === "ordered" ? `Step ${idx + 1}:` : `•`
              } ${stripHTML(text)}`;
            });
            return `\nHere’s a ${
              data.style === "ordered" ? "step-by-step" : "bullet"
            } list:\n${items.join("\n")}\n`;

          case "quote":
            return `\nHere’s a quote: "${stripHTML(data.text)}"${
              data.caption ? ` — said by ${stripHTML(data.caption)}` : ""
            }\n`;

          case "code":
            return `\nLet me read a code snippet for you:\n${data.code}\n`;

          case "table":
            const rows = data.content.map((row, i) => {
              if (data.withHeadings && i === 0) {
                return `Table headers: ${row.join(", ")}`;
              }
              return `${row.join(", ")}`;
            });
            return `\nNow, here's a table for you:\n${rows.join("\n")}\n`;

          case "linkTool":
            return `\nHere’s a useful link: "${
              data.meta.title || "Untitled"
            }".\n`;

          default:
            return "";
        }
      })
      .join("\n");
  } catch (error) {
    console.error("Error parsing content:", error);
    return "";
  }
}
function stripHTML(html) {
  return html
    ?.replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
