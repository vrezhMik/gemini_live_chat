export type Message = {
  type: "client" | "server";
  prompt: string;
};

export interface IChat {
  _id: number;
  name: string;
}
