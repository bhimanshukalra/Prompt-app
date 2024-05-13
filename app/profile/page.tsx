"use client";

import { Profile } from "@components";
import { Prompt } from "@types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const MyProfile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<Prompt[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user?.email}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    if (session?.user?.email) {
      fetchPosts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleEdit = (currentPrompt: Prompt) => {
    router.push(`/update-prompt?id=${currentPrompt._id}`);
  };
  const handleDelete = async (currentPrompt: Prompt) => {
    const isConfirmed = confirm("Are you sure you want to delete this prompt?");
    if (isConfirmed) {
      try {
        await fetch(`/api/prompt/${currentPrompt._id}`, { method: "DELETE" });

        const updatePosts = posts.filter(
          (item) => item._id !== currentPrompt._id
        );

        setPosts(updatePosts);
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      prompts={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
