import Prompt from "@models/prompt.model.js";
import User from "@models/user.model.js"; 
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompts = await Prompt.findById(params.id).populate("creator");
    if (!prompts) {
      return new Response("Prompt not found", { status: 404 });
    }
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log("Error in fetchPrompt: ", error);
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt) {
      return new Response("Prompt not found", { status: 404 });
    }

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    console.log("Error in Prompt: ", error);
    return new Response("Failed to edit prompts", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);
    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    console.log("Error in fetchPrompt: ", error);
    return new Response("Failed to delete prompts", { status: 500 });
  }
};
