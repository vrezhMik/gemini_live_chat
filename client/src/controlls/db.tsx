const createNewChat = async () => {
  const response = await fetch(`${process.env.REACT_APP_BACKEND}/new-chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const { chat } = await response.json();
  const newChat = {
    _id: chat._id,
    name: chat.name,
  };

  return newChat;
};
export default createNewChat;
