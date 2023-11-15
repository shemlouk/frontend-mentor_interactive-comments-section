import * as fs from "fs";
import { Data } from "./definitions";

const PATH_TO_FILE = process.cwd() + "/public/data.json";

export async function getStaticData() {
  console.log("Data fetched!");
  return JSON.parse(fs.readFileSync(PATH_TO_FILE, "utf-8")) as Data;
}
