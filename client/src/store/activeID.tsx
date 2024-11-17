const initialState: number | null = null; // Initial state is null or a number

const activeID = (
  state = initialState,
  action: { type: string; payload?: number }
) => {
  switch (action.type) {
    case "SET_ACTIVE_ID":
      return action.payload || null;
    case "CLEAR_ACTIVE_ID":
      return null;
    default:
      return state;
  }
};

export const setActiveId = (id: number) => ({
  type: "SET_ACTIVE_ID",
  payload: id,
});

export const clearActiveId = () => ({
  type: "CLEAR_ACTIVE_ID",
});

export default activeID;
