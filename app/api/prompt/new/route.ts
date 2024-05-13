import Prompt from "@models/prompt";
import { Post } from "@types";
import { connectToDb } from "@utils/database";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const { userId, prompt, tag } = await request.json();

    await connectToDb();
    const newPrompt = new Prompt({ creator: userId, prompt, tag });
    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log("error", error);
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
