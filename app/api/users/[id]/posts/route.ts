import Prompt from "@models/prompt";
import { connectToDb } from "@utils/database";
import { NextRequest } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: any }
) => {
  try {
    await connectToDb();

    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all prompts", { status: 500 });
  }
};
