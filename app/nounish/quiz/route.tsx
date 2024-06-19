/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { error } from "frames.js/core";
import { frames } from "../frames";
import { questions } from "../contents";
import { setPoints } from "../../lib/game";

const frameHandler = frames(async (ctx) => {
  // if (!ctx?.message?.isValid) {
  //   return error("invalid input");
  // }

  const fid = ctx.message?.requesterFid;
  if (!fid) {
    return error("No fid identified");
  }
  let state = ctx.state || { currentQuizIndex: 0, score: 0 };

  const currentQuestion = questions[state.currentQuizIndex];
  if (!currentQuestion) {
    return error("invalid question");
  }

  if (ctx.pressedButton) {
    const correctAnswer =
      currentQuestion.options[currentQuestion["answerIndex"]];
    if (ctx.searchParams?.value === correctAnswer) {
      state = { ...state, score: state.score + 50 };
    }

    const lastQuetion = !(state.currentQuizIndex < questions.length - 1);
    if (lastQuetion) {
      setPoints(fid, state.score);
      /** reset state */
      state = { ...state, currentQuizIndex: 0, score: 0 };
    } else {
      state = { ...state, currentQuizIndex: state.currentQuizIndex + 1 };
    }
  }

  const buttons = currentQuestion.options.map((option, index) => (
    <Button
      action="post"
      target={{ pathname: "/quiz", query: { value: option } }}
    >
      {option}
    </Button>
  ));

  return {
    image: (
      <div tw="flex bg-orange-500 flex-grow px-12">
        <div tw="flex flex-col">
          <p tw="text-white text-6xl text-orange-100">
            {currentQuestion.question}
          </p>
          <p tw="text-white text-6xl text-orange-200">Score: {state.score}</p>
        </div>
      </div>
    ),
    state,
    buttons,
  };
});

export const GET = frameHandler;
export const POST = frameHandler;
