import { CONSTANTS } from "../actions";
import uuid from "react-uuid";

interface Card {
  id: string;
  text: string;
  done: boolean;
  groups: string[];
}

interface List {
  id: string;
  title: string;
  cards: Card[];
}

interface Category {
  id: string;
  name: string;
  lists: List[];
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
              groups: ["Office"],
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
              groups: ["PhD"],
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
      const newCat: Category = {
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
      return { ...state, activeCategoryId: categoryId };
    }
    // LIST logic
    case CONSTANTS.ADD_LIST: {
      const { categoryId, listTitle } = action.payload;
      return {
        ...state,
        categories: state.categories.map((cat) => {
          if (cat.id !== categoryId) return cat;
          const newList = {
            id: uuid(),
            title: listTitle,
            cards: [] as Card[],
          };
          return { ...cat, lists: [...cat.lists, newList] };
        }),
      };
    }
    case CONSTANTS.EDIT_LIST_TITLE: {
      const { categoryId, listId, newTitle } = action.payload;
      return {
        ...state,
        categories: state.categories.map((cat) => {
          if (cat.id !== categoryId) return cat;
          const updatedLists = cat.lists.map((lst) =>
            lst.id === listId ? { ...lst, title: newTitle } : lst
          );
          return { ...cat, lists: updatedLists };
        }),
      };
    }
    case CONSTANTS.DELETE_LIST: {
      const { categoryId, listId } = action.payload;
      return {
        ...state,
        categories: state.categories.map((cat) => {
          if (cat.id !== categoryId) return cat;
          return { ...cat, lists: cat.lists.filter((l) => l.id !== listId) };
        }),
      };
    }
    // CARD logic
    case CONSTANTS.ADD_CARD: {
      const { categoryId, listId, text, groups = [] } = action.payload;
      return {
        ...state,
        categories: state.categories.map((cat) => {
          if (cat.id !== categoryId) return cat;
          const newLists = cat.lists.map((lst) => {
            if (lst.id === listId) {
              return {
                ...lst,
                cards: [
                  ...lst.cards,
                  { id: uuid(), text, done: false, groups },
                ],
              };
            }
            return lst;
          });
          return { ...cat, lists: newLists };
        }),
      };
    }
    case CONSTANTS.EDIT_CARD: {
      const { categoryId, listId, id, newText, newGroups } = action.payload;
      return {
        ...state,
        categories: state.categories.map((cat) => {
          if (cat.id !== categoryId) return cat;
          const newLists = cat.lists.map((lst) => {
            if (lst.id !== listId) return lst;
            const updatedCards = lst.cards.map((card) =>
              card.id === id
                ? { ...card, text: newText, groups: newGroups ?? card.groups }
                : card
            );
            return { ...lst, cards: updatedCards };
          });
          return { ...cat, lists: newLists };
        }),
      };
    }
    case CONSTANTS.DELETE_CARD: {
      const { categoryId, listId, id } = action.payload;
      return {
        ...state,
        categories: state.categories.map((cat) => {
          if (cat.id !== categoryId) return cat;
          const newLists = cat.lists.map((lst) => {
            if (lst.id !== listId) return lst;
            return { ...lst, cards: lst.cards.filter((c) => c.id !== id) };
          });
          return { ...cat, lists: newLists };
        }),
      };
    }
    case CONSTANTS.TOGGLE_CARD_DONE: {
      const { categoryId, listId, cardId } = action.payload;
      return {
        ...state,
        categories: state.categories.map((cat) => {
          if (cat.id !== categoryId) return cat;
          const updatedLists = cat.lists.map((lst) => {
            if (lst.id !== listId) return lst;
            const updatedCards = lst.cards.map((card) =>
              card.id === cardId ? { ...card, done: !card.done } : card
            );
            return { ...lst, cards: updatedCards };
          });
          return { ...cat, lists: updatedLists };
        }),
      };
    }

    case CONSTANTS.DRAG_HAPPENED: {
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        draggableId,
        type,
      } = action.payload;

      // We'll only reorder items inside the currently active category
      const newCategories = state.categories.map((cat) => {
        if (cat.id !== state.activeCategoryId) {
          return cat;
        }
        // Reorder entire lists
        if (type === "list") {
          const newLists = Array.from(cat.lists);
          const [removedList] = newLists.splice(droppableIndexStart, 1);
          newLists.splice(droppableIndexEnd, 0, removedList);
          return {
            ...cat,
            lists: newLists,
          };
        }
        // Reordering cards
        if (droppableIdStart === droppableIdEnd) {
          // Same list
          const list = cat.lists.find((lst) => lst.id === droppableIdStart);
          if (!list) return cat;

          const newCards = Array.from(list.cards);
          const [removedCard] = newCards.splice(droppableIndexStart, 1);
          newCards.splice(droppableIndexEnd, 0, removedCard);

          const newList = { ...list, cards: newCards };
          return {
            ...cat,
            lists: cat.lists.map((lst) =>
              lst.id === droppableIdStart ? newList : lst
            ),
          };
        } else {
          // Moving card from one list to another
          const listStart = cat.lists.find((lst) => lst.id === droppableIdStart);
          const listEnd = cat.lists.find((lst) => lst.id === droppableIdEnd);
          if (!listStart || !listEnd) return cat;

          const newCardsStart = Array.from(listStart.cards);
          const [removedCard] = newCardsStart.splice(droppableIndexStart, 1);

          const newCardsEnd = Array.from(listEnd.cards);
          newCardsEnd.splice(droppableIndexEnd, 0, removedCard);

          const newListStart = { ...listStart, cards: newCardsStart };
          const newListEnd = { ...listEnd, cards: newCardsEnd };

          return {
            ...cat,
            lists: cat.lists.map((lst) => {
              if (lst.id === droppableIdStart) {
                return newListStart;
              }
              if (lst.id === droppableIdEnd) {
                return newListEnd;
              }
              return lst;
            }),
          };
        }
      });
      return {
        ...state,
        categories: newCategories,
      };
    }
    default:
      return state;
  }
}
