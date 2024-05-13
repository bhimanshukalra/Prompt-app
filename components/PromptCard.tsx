"use client";

import { Prompt } from "@types";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

type PromptCardProps = {
  currentPrompt: Prompt;
  handleTagClick?: (tag: string) => void;
  handleEdit: () => void;
  handleDelete: () => void;
};

const PromptCard = ({
  currentPrompt,
  handleDelete,
  handleEdit,
  handleTagClick,
}: PromptCardProps) => {
  // Move copiedPromptId to parent
  const [copiedPromptId, setCopiedPromptId] = useState("");
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();

  const handleCopy = () => {
    console.log("currentPrompt", currentPrompt);
    setCopiedPromptId(currentPrompt._id);
    navigator.clipboard.writeText(currentPrompt.prompt);
    setTimeout(() => setCopiedPromptId(""), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={currentPrompt.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {currentPrompt.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {currentPrompt.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copiedPromptId === currentPrompt._id
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
            alt="copy_icon"
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">
        {currentPrompt.prompt}
      </p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(currentPrompt.tag)}
      >
        {currentPrompt.tag}
      </p>
      <p>current: {currentPrompt._id}</p>
      <p>copied: {copiedPromptId}</p>
      {session?.user?.email === currentPrompt.creator._id &&
        pathname === "/profile" && (
          <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )}
    </div>
  );
};

export default PromptCard;
