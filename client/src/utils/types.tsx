export type Prompt = {
  response: {
    candidates: Array<{
      content: {
        parts: Array<{ text: string }>;
      };
    }>;
  };
};
export type Message = {
  type: string; // e.g., 'client' or 'server'
  prompt: string | Prompt; // Allow both string and structured Prompt
};

export interface IChat {
  _id: number;
  name: string;
}
