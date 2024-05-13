"use client";

import React, { InputHTMLAttributes, useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { Prompt } from "@types";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState<Prompt[]>([]);

  const handleSearchChange = (e: InputHTMLAttributes<HTMLInputElement>) => {};

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList posts={posts} handleTagClick={() => {}} />
    </section>
  );
};

type PromptCardListProps = {
  posts: Prompt[];
  handleTagClick: () => void;
};

const PromptCardList = ({ posts, handleTagClick }: PromptCardListProps) => {
  return (
    <div className="mt-16 prompt_layout">
      {posts.map((currentPrompt) => (
        <PromptCard
          // @ts-ignore
          key={currentPrompt._id}
          currentPrompt={currentPrompt}
          handleTagClick={handleTagClick}
          handleDelete={() => {}}
          handleEdit={() => {}}
        />
      ))}
    </div>
  );
};

export default Feed;
