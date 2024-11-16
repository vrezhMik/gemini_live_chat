import Counter from "../models/Counter";

export const getNextSequence = async (name: string): Promise<number> => {
  const counter = await Counter.findOneAndUpdate(
    { _id: name },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counter.seq;
};
