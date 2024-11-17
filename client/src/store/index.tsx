import { combineReducers } from "@reduxjs/toolkit";
import activeID from "./activeID";

const rootReducer = combineReducers({
  activeId: activeID,
});

export default rootReducer;
