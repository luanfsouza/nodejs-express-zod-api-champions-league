import { ClubModel } from "../models/clubModel";
import fs from "fs/promises";
import { join } from "path";

export const findAll = async () => {
  const database = await fs.readFile("./src/data/clubs.json", "utf-8");
  const clubs: ClubModel[] = JSON.parse(database);
  return clubs;
};
