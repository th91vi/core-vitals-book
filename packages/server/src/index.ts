import { IncomingMessage, createServer } from "http";
import dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({
  path: resolve(__dirname, ".env"),
});

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

const pageSpeedRequest = async (url: string) => {
  const res = await fetch(
    `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${url}&strategy=mobile&key=${GOOGLE_API_KEY}`
  );
  const json = await res.json();

  return json;
};

const server = createServer();

server.on("request", async (req: IncomingMessage, res) => {
  let response = {};

  req.on("data", async (chunk) => {
    const data = JSON.parse(chunk);

    response = await pageSpeedRequest(data?.url);

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: response,
      })
    );
  });
});

server.on("error", (error) => {
  console.error(error.message);
});

server.listen(5000);