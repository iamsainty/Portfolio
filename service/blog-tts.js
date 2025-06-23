import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";
import { uploadBlogTTS } from "./uploadToAWS";

const pollyClient = new PollyClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

export async function generateBlogTTS(title, content, permalink) {
  try {
    const parsedContent = parseContent(content);
    const text = `${title}. ${parsedContent}`;

    const command = new SynthesizeSpeechCommand({
      Engine: "neural",
      LanguageCode: "en-IN",
      OutputFormat: "mp3",
      Text: text,
      VoiceId: "Kajal",
    });

    const { AudioStream } = await pollyClient.send(command);

    if (!AudioStream) throw new Error("AudioStream is null");

    const buffer = await streamToBuffer(AudioStream);

    const audioUrl = await uploadBlogTTS(buffer, permalink);

    return audioUrl;
  } catch (error) {
    console.error("Error generating blog TTS:", error);
    return null;
  }
}

function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });
}

function parseContent(content) {
  try {
    if (!content || !content.blocks) return "";

    return content.blocks
      .map((block) => {
        switch (block.type) {
          case "header":
            return `${block.data.text}\n`;
          case "paragraph":
            return `${block.data.text}\n`;
          case "list":
            return block.data.items.map((item) => `• ${item}`).join("\n");
          case "quote":
            return `"${block.data.text}"\n`;
          case "code":
            return `Code: ${block.data.code}\n`;
          case "table":
            return block.data.content.map((row) => row.join(" | ")).join("\n");
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
