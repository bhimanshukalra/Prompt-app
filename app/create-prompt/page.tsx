"use client";

import { Form } from "@components";
import { Post } from "@types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreatePrompt = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post>({
    prompt: "",
    tag: "",
  });
  const router = useRouter();
  const { data: session } = useSession();

  const createPost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          ...currentPost,
          userId: session?.user?.email,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      currentPost={currentPost}
      setCurrentPost={setCurrentPost}
      isSubmitting={isSubmitting}
      onSubmit={createPost}
    />
  );
};

export default CreatePrompt;
