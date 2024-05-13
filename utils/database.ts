import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_DB_URL ?? "", {
      dbName: "share_prompt",
    });
    isConnected = true;
  } catch (error) {
    console.log("error: ", error);
  }
};
