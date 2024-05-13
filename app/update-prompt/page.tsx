"use client";

import { Form } from "@components";
import { Post } from "@types";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

const UpdatePrompt = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentPost, setCurrentPost] = useState<Post>({
    prompt: "",
    tag: "",
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setCurrentPost(data);
    };
    if (promptId) {
      getPromptDetails();
    }
  }, [promptId]);

  const updatePost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!promptId) {
      return alert("Prompt ID not found");
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          ...currentPost,
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
    <Suspense>
      <Form
        type="Edit"
        currentPost={currentPost}
        setCurrentPost={setCurrentPost}
        isSubmitting={isSubmitting}
        onSubmit={updatePost}
      />
    </Suspense>
  );
};

export default UpdatePrompt;
