import * as fs from "fs";
import { Data } from "./definitions";
import { findCommentById, generateRandomNumber } from "./utils";

const PATH_TO_FILE = "/app/data.json";

export async function fetchData(maxDelay = 0) {
  await new Promise((resolve) =>
    setTimeout(resolve, generateRandomNumber(maxDelay))
  );

  return JSON.parse(fs.readFileSync(PATH_TO_FILE, "utf-8")) as Data;
}

export function updateData(newData: Data) {
  fs.writeFileSync(PATH_TO_FILE, JSON.stringify(newData));
}

export async function fetchComment(id: number, maxDelay = 0) {
  await new Promise((resolve) =>
    setTimeout(resolve, generateRandomNumber(maxDelay))
  );

  const data = await fetchData();
  const { comment } = findCommentById(id, data.comments);
  return comment;
}
