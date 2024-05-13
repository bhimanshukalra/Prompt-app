import { Prompt } from "@types";
import React from "react";
import PromptCard from "./PromptCard";

interface ProfileProps {
  name: "My";
  desc: string;
  prompts: Prompt[];
  handleEdit?: (currentPrompt: Prompt) => void;
  handleDelete?: (currentPrompt: Prompt) => void;
}

const Profile = ({
  name,
  desc,
  prompts,
  handleEdit,
  handleDelete,
}: ProfileProps) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {prompts.map((currentPrompt) => (
          <PromptCard
            // @ts-ignore
            key={currentPrompt._id}
            currentPrompt={currentPrompt}
            handleDelete={() => handleDelete && handleDelete(currentPrompt)}
            handleEdit={() => handleEdit && handleEdit(currentPrompt)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
