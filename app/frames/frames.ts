import { createFrames } from "frames.js/next";
import { FRAMES_BASE_PATH, appURL } from "../utils";
import { farcasterHubContext } from "frames.js/middleware";
import * as fs from "node:fs/promises";
import * as path from "node:path";

type State = {
  currentQuizIndex: number;
  score: number;
};

export const frames = createFrames<State>({
  basePath: FRAMES_BASE_PATH,
  baseUrl: appURL(),
  initialState: { currentQuizIndex: 0, score: 0 },
  middleware: [
    farcasterHubContext({
      ...(process.env.NODE_ENV === "production"
        ? {
            hubHttpUrl: "https://hubs.airstack.xyz",
            hubRequestOptions: {
              headers: {
                "x-airstack-hubs": process.env.AIRSTACK_API_KEY as string,
              },
            },
          }
        : {
            hubHttpUrl: "http://localhost:3010/hub",
          }),
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  imageRenderingOptions: async () => {
    const lightFont = fs.readFile(
      path.join(
        path.resolve(process.cwd(), "public"),
        "LondrinaSolid-Light.ttf"
      )
    );

    const regularFont = fs.readFile(
      path.join(
        path.resolve(process.cwd(), "public"),
        "LondrinaSolid-Regular.ttf"
      )
    );

    const [lightFontData, regularFontData] = await Promise.all([
      lightFont,
      regularFont,
    ]);
    return {
      imageOptions: {
        fonts: [
          {
            name: "Londrina-Solid",
            data: lightFontData,
            weight: 300,
          },
          {
            name: "Londrina-Solid",
            data: regularFontData,
            weight: 400,
          },
        ],
      },
    };
  },
});
