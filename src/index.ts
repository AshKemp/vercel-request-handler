import express from "express";
import { S3 } from "aws-sdk";
const app = express();

const s3 = new S3({
  credentials: {
    accessKeyId: "c6f5297b909b7bc60c122605f1db3395",
    secretAccessKey:
      "75dba6dcea59702bada497ab3ff477a52814c509c0f40a577d7cbb8948b6fa17",
  },
  endpoint: "https://64e04d382b4e848cf00220d4577a091a.r2.cloudflarestorage.com",
});

app.get("/*", async (req, res) => {
  const host = req.hostname;
  console.log(host);
  const id = host.split(".")[0];
  console.log(id);
  const filePath = req.path;

  const contents = await s3
    .getObject({
      Bucket: "vercel-clone",
      Key: `dist/${id}/${filePath}`,
    })
    .promise();

  const type = filePath.endsWith("html")
    ? "text/html"
    : filePath.endsWith("css")
    ? "text/css"
    : "application/javascript";

  res.set("Content-Type", type);
  res.send(contents.Body);
});

app.listen(3001);
