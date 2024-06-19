import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const toIdString = (fid: number) => fid.toString();

const createCompositeKey = (key: string, fid: number) =>
  `${key}:${toIdString(fid)}`;

export const saveData = async (key: string, fid: number, value: string) => {
  const compositeKey = createCompositeKey(key, fid);
  await redis.set(compositeKey, value);
};

export const getData = async (
  key: string,
  fid: number
): Promise<string | null> => {
  const compositeKey = createCompositeKey(key, fid);
  return await redis.get(compositeKey);
};

export const removeData = async (key: string, fid: number) => {
  const compositeKey = createCompositeKey(key, fid);
  await redis.del(compositeKey);
};
