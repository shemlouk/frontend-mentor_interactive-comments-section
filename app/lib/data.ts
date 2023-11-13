import data from "@/data.json" assert { type: "json" };
import { Data } from "./definitions";

export async function fetchData() {
  return data as Data;
}
