/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames } from "./frames";

const frameHandler = frames(async (ctx) => {
  return {
    image: (
      <div tw="flex bg-orange-500 flex-grow px-12">
        <div tw="flex flex-col">
          <h1 tw="text-white text-8xl">how nounish are you?</h1>
          <p tw="text-white text-4xl text-orange-200">
            (let&apos;s play a fun little quiz. qualify to purchase your premium
            NOUNISH MERCH. higher scores lead to rarity colors. play to the end
            for a hidden 💎💎.)
          </p>
          <h2 tw="text-white text-6xl">follow /outpaint + ❤️ to start</h2>
        </div>
      </div>
    ),
    buttons: [
      <Button action="post" target={{ pathname: "/nounish/gated" }}>
        start
      </Button>,
    ],
  };
});

export const GET = frameHandler;
export const POST = frameHandler;
