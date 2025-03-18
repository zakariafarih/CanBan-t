import uuid from "react-uuid";
import { CONSTANTS } from "../actions";

const InitialState = [
  {
    title: "To-do",
    id: uuid(),
    cards: [
      {
        id: uuid(),
        text: "Bring milk and fruits",
        done: false,
        group: "Errands"
      },
      {
        id: uuid(),
        text: "Review final year project thesis",
        done: false,
        group: ""
      },
      {
        id: uuid(),
        text: "Push codes to Git + Write ReadMe",
        done: false,
        group: "Work"
      }
    ],
  },
];

const listReducer = (state = InitialState, action: any) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST: {
      const newList = {
        title: action.payload,
        id: uuid(),
        cards: [],
      };
      return [...state, newList];
    }

    case CONSTANTS.ADD_CARD: {
      const newCard = {
        text: action.payload.text,
        id: uuid(),
      };
      const newState = JSON.parse(JSON.stringify(state)).map((i: any) => {
        if (i.id === action.payload.listId) {
          return {
            ...i,
            cards: [...i.cards, newCard],
          };
        }
        return i;
      });
      return newState;
    }

    case CONSTANTS.DRAG_HAPPENED: {
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        // draggableId,
        type,
      } = action.payload;

      const newDragState = [...state];

      // Moving the entire list
      if (type === "list") {
        const list = newDragState.splice(droppableIndexStart, 1);
        newDragState.splice(droppableIndexEnd, 0, ...list);
        return newDragState;
      }

      // Same list re-order
      if (droppableIdStart === droppableIdEnd) {
        const list = newDragState.find((lst) => lst.id === droppableIdStart);
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
      }

      // Different list move
      if (droppableIdStart !== droppableIdEnd) {
        const listStart = newDragState.find((lst) => lst.id === droppableIdStart);
        const card = listStart.cards.splice(droppableIndexStart, 1);
        const listEnd = newDragState.find((lst) => lst.id === droppableIdEnd);
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
      }
      return newDragState;
    }

    case CONSTANTS.EDIT_LIST_TITLE: {
      const { listId, newTitle } = action.payload;
      const newState = [...state];
      const elementPos = newState.map((x) => x.id).indexOf(listId);
      newState[elementPos].title = newTitle;
      return newState;
    }

    case CONSTANTS.DELETE_LIST: {
      const { listId } = action.payload;
      const newDelState = JSON.parse(JSON.stringify(state));
      const elementPos = newDelState.map((x: any) => x.id).indexOf(listId);
      newDelState.splice(elementPos, 1);
      return newDelState;
    }

    case CONSTANTS.EDIT_CARD: {
      const { id, newText, listId } = action.payload;
      const newCardState = JSON.parse(JSON.stringify(state));
      const elementPos = newCardState.map((x: any) => x.id).indexOf(listId);
      const cardPos = newCardState[elementPos].cards
        .map((x: any) => x.id)
        .indexOf(id);
      newCardState[elementPos].cards[cardPos].text = newText;
      return newCardState;
    }

    case CONSTANTS.DELETE_CARD: {
      const { listId, id } = action.payload;
      const newCardDelState = JSON.parse(JSON.stringify(state));
      const elementPos = newCardDelState.map((x: any) => x.id).indexOf(listId);
      const cardPos = newCardDelState[elementPos].cards
        .map((x: any) => x.id)
        .indexOf(id);
      newCardDelState[elementPos].cards.splice(cardPos, 1);
      return newCardDelState;
    }

    case CONSTANTS.TOGGLE_CARD_DONE: {
      const { listId, cardId } = action.payload;
      const newState = JSON.parse(JSON.stringify(state));
      const listIndex = newState.findIndex((lst: any) => lst.id === listId);
      if (listIndex === -1) return state;
      const cardIndex = newState[listIndex].cards.findIndex((c: any) => c.id === cardId);
      if (cardIndex === -1) return state;
      newState[listIndex].cards[cardIndex].done = !newState[listIndex].cards[cardIndex].done;
      return newState;
    }

    default:
      return state;
  }
};

export default listReducer;