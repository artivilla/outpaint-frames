import { Button } from "frames.js/next";
import { frames } from "../frames";
import { questions } from "../contents";
import { setPoints } from "../../lib/game";

const handler = frames(async (ctx) => {
  let state = ctx.state || { currentQuizIndex: 0, score: 0 };

  const currentQuestion = questions[state.currentQuizIndex];
  if (!currentQuestion) {
    return new Error("Invalid question");
  }

  if (ctx.pressedButton) {
    const correctAnswerIndex = currentQuestion?.answer;

    if (ctx.pressedButton.index === correctAnswerIndex) {
      state = { ...state, score: state.score + 50 };
    }

    const lastQuetion = !(state.currentQuizIndex < questions.length - 1);
    if (lastQuetion) {
      setPoints(ctx.fid, state.score);
      /** reset state */
      state = { ...state, currentQuizIndex: 0, score: 0 };
    } else {
      state = { ...state, currentQuizIndex: state.currentQuizIndex + 1 };
    }
  }

  return {
    image: (
      <div tw="flex flex-col items-center">
        <div>{currentQuestion.question}</div>
        <div tw="mt-4">Score: {state.score}</div>
      </div>
    ),
    state,
  };
});

export const GET = handler;
export const POST = handler;
