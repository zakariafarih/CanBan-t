import { combineReducers } from "redux";
import listReducer from "./listReducer"
import categoryReducer from "./categoryReducer";

const rootReducer = combineReducers({
  lists: listReducer,

  categoriesState: categoryReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
