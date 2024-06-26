/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { error } from "frames.js/core";
import { frames } from "../frames";
import { isUserFollowingChannels } from "../../lib/farcaster";
import { getCapColor, getLastPlayedTimestamp, getPoints } from "../../lib/game";

const REQUIRED_CHANNELS = ["outpaint"];
const frameHandler = frames(async (ctx) => {
  // if (!ctx?.message?.isValid) {
  //   return error("Invalid input");
  // }

  const fid = ctx.message?.requesterFid;
  if (!fid) {
    return error("No fid identified");
  }

  if (!(await isUserFollowingChannels(fid, REQUIRED_CHANNELS))) {
    return error("follow /outpaint to start", 403);
  }

  const lastPlayedTimeStamp = await getLastPlayedTimestamp(fid);
  let isUserEligibleToPlayAgain = true;
  if (lastPlayedTimeStamp) {
    const now = new Date().getTime();
    const diffInHours = (now - lastPlayedTimeStamp * 1000) / (1000 * 60 * 60);
    isUserEligibleToPlayAgain = diffInHours >= 12;
  }

  let points = 0;
  /** newPlayers have no timestamps */
  const newPlayer = !Boolean(lastPlayedTimeStamp);
  if (!newPlayer) {
    points = await getPoints(fid);
  }

  // debug
  // let newPlayer = false;
  // const isUserEligibleToPlayAgain = true;
  // const points = 0;

  return {
    image: (
      <div tw="flex bg-orange-500 flex-grow px-12">
        {newPlayer ? (
          <div tw="flex flex-col">
            <h1 tw="text-white text-8xl">looks like you&apos;re new here!</h1>
            <p tw="text-white text-4xl text-orange-200">
              answer as many as you can and earn a winning color on your points.
            </p>
          </div>
        ) : (
          <div tw="flex flex-col">
            <h1 tw="text-white text-8xl">want to play again?</h1>
            <p tw="text-white text-4xl text-orange-200">
              (come back in 12 hours and try again)
            </p>
          </div>
        )}
      </div>
    ),
    buttons: [
      newPlayer && (
        <Button action="post" target={{ pathname: "/quiz" }}>
          start quiz
        </Button>
      ),
      !newPlayer && isUserEligibleToPlayAgain && (
        <Button action="post" target={{ pathname: "/quiz" }}>
          start quiz
        </Button>
      ),
      !newPlayer && (
        <Button
          action="post"
          target={{ pathname: `/store/${getCapColor(points)}` }}
        >
          claim your cap
        </Button>
      ),
    ],
  };
});

export const GET = frameHandler;
export const POST = frameHandler;
