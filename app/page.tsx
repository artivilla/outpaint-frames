import { fetchMetadata } from "frames.js/next";
import type { Metadata } from "next";
import Link from "next/link";
import { appURL } from "./utils";
import { DebugLink } from "./components/DebugLink";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "outpaint frames",
    other: {
      ...(await fetchMetadata(new URL("/nounish", appURL()))),
    },
  };
}

// This is a react server component only
export default async function Home() {
  // then, when done, return next frame
  return (
    <div className="p-4">
      nothing to see here. for more info, check out the{" "}
      <Link href="https://outpaint.io/">outpaint.io</Link>
    </div>
  );
}
