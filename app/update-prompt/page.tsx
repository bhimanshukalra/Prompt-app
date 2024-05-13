import React, { Suspense } from "react";
import UpdateForm from "./update-form";

const UpdatePrompt = () => {
  return (
    <Suspense>
      <UpdateForm />
    </Suspense>
  );
};

export default UpdatePrompt;
