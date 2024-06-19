import { getData, saveData } from "./redis";

export async function getLastPlayedTimestamp(
  fid: number
): Promise<number | null> {
  const data = await getData("lastPlayed", fid);
  return typeof data === "number" ? data : null;
}

export async function getPoints(fid: number): Promise<number> {
  const data = await getData("lastPlayed", fid);
  return typeof data === "number" ? data : 0;
}

export function getCapColor(points: number): string {
  return "white";
}

export async function setPoints(fid: number, value: number) {
  const data = await saveData("points", fid, value.toString());
}
