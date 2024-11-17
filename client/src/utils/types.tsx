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
  type: string;
  prompt: string | Prompt;
};

export interface IChat {
  _id: number;
  name: string;
}
