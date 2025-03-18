import { CONSTANTS } from "../actions";
import uuid from "react-uuid";

interface Category {
  id: string;
  name: string;
  lists: any[];
}

export interface CategoryState {
  activeCategoryId: string | null;
  categories: Category[];
}

const initialState: CategoryState = {
  activeCategoryId: null,
  categories: [
    {
      id: uuid(),
      name: "Work",
      lists: [
        {
          id: uuid(),
          title: "To-do",
          cards: [
            {
              id: uuid(),
              text: "Prepare monthly report",
              done: false,
              group: "Office",
            },
          ],
        },
      ],
    },
    {
      id: uuid(),
      name: "Studies",
      lists: [
        {
          id: uuid(),
          title: "Research",
          cards: [
            {
              id: uuid(),
              text: "Literature review",
              done: false,
              group: "PhD",
            },
          ],
        },
      ],
    },
  ],
};

export default function categoryReducer(
  state = initialState,
  action: any
): CategoryState {
  switch (action.type) {
    case CONSTANTS.ADD_CATEGORY: {
      const { categoryName } = action.payload;
      const newCat = {
        id: uuid(),
        name: categoryName,
        lists: [],
      };
      return {
        ...state,
        categories: [...state.categories, newCat],
      };
    }
    case CONSTANTS.EDIT_CATEGORY: {
      const { categoryId, newName } = action.payload;
      return {
        ...state,
        categories: state.categories.map((cat) =>
          cat.id === categoryId ? { ...cat, name: newName } : cat
        ),
      };
    }
    case CONSTANTS.DELETE_CATEGORY: {
      const { categoryId } = action.payload;
      return {
        ...state,
        categories: state.categories.filter((cat) => cat.id !== categoryId),
        activeCategoryId:
          state.activeCategoryId === categoryId ? null : state.activeCategoryId,
      };
    }
    case CONSTANTS.SET_ACTIVE_CATEGORY: {
      const { categoryId } = action.payload;
      return {
        ...state,
        activeCategoryId: categoryId,
      };
    }
    default:
      return state;
  }
}
