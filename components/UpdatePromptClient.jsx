"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Form from "@components/Form";

const UpdatePromptClient = ({ initialPrompt }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [post, setPost] = useState(initialPrompt);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/prompt/${initialPrompt._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (!response.ok) throw new Error("Failed to update prompt.");

      router.push("/");
    } catch (error) {
      console.error("Error in updatePrompt:", error);
      alert("Failed to update prompt. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!session) {
    router.push("/");
    return null;
  }

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      isSubmitting={isSubmitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePromptClient;
