"use server";

import * as fs from "fs";
import { fetchData } from "./data";
import { Comment, User } from "./definitions";

const PATH_TO_FILE = "./data.json";

export async function createComment(currentUser: User, formData: FormData) {
  try {
    const data = await fetchData();

    const comment = {
      id: data.comments.length + 1,
      content: formData.get("content") as string,
      createdAt: "now",
      score: 0,
      user: currentUser,
      replies: [] as Comment[],
    };

    data.comments.push(comment);
    const dataToWrite = JSON.stringify(data);

    fs.writeFileSync(PATH_TO_FILE, dataToWrite);
  } catch (error) {
    console.error(error);
  }
}
