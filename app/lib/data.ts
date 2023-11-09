import data from "@/data.json" assert { type: "json" };
import { Data } from "./definitions";

export async function fetchData() {
  console.log("Fetch simulation - 3 seconds");
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  return data as Data;
}
