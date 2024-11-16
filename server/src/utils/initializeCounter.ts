import Counter from "../models/Counter";

const initializeCounter = async () => {
  const existingCounter = await Counter.findOne({ _id: "history_id" });
  if (!existingCounter) {
    await Counter.create({ _id: "history_id", seq: 0 });
    console.log("Counter initialized");
  } else console.log("Counter already exists");
};
