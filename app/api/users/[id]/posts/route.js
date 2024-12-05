import Prompt from "@models/prompt.model";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log("Error in Fetch User Posts: ", error);
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};
