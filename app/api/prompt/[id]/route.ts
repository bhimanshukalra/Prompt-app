import Prompt from "@models/prompt";
import { connectToDb } from "@utils/database";
import { NextRequest } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: any }
) => {
  try {
    await connectToDb();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompt", { status: 500 });
  }
};

export const PATCH = async (
  request: NextRequest,
  { params }: { params: any }
) => {
  try {
    const { prompt, tag } = await request.json();
    await connectToDb();

    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompt", { status: 500 });
  }
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: any }
) => {
  try {
    await connectToDb();

    await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
