import { json } from "stream/consumers";

async function createHistoryDB(): Promise<Response> {
  const response = await fetch("http://localhost:5002/new-chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

export default createHistoryDB;
