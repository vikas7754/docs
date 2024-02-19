import yaml from "js-yaml";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  try {
    const { file } = req.query;
    const filePath = path.resolve(process.cwd(), "public", file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const data = yaml.load(fileContent);
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: "server error" });
  }
}
