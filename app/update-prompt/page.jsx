import { notFound } from "next/navigation";
import connectToDB from "@utils/database";
import Prompt from "@models/prompt.model";
import UpdatePromptClient from "../../components/UpdatePromptClient";

export default async function UpdatePrompt({ searchParams }) {
  const { id } = searchParams;

  if (!id) {
    notFound(); // Show a 404 page if ID is missing
  }

  try {
    await connectToDB();

    const prompt = await Prompt.findById(id).lean();
    if (!prompt) {
      notFound(); // Show a 404 page if the prompt doesn't exist
    }

    const initialPrompt = JSON.parse(JSON.stringify(prompt));

    // Pass the initial data to the client component
    return <UpdatePromptClient initialPrompt={initialPrompt} />;
  } catch (error) {
    console.error("Error fetching prompt details:", error);
    notFound(); // Handle errors gracefully
  }
}
