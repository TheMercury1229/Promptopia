"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

import Form from "@components/Form";
const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  const createPrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });
      console.log(response);
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log("Error in createPrompt: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  if(!session?.user){
    redirect('/');
  }
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      isSubmitting={isSubmitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
