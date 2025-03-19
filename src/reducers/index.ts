import { combineReducers } from "redux";
import categoryReducer from "./categoryReducer";

const rootReducer = combineReducers({
  categoriesState: categoryReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
