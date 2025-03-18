import { CONSTANTS } from "./index";

export interface AddCardAction {
  type: typeof CONSTANTS.ADD_CARD;
  payload: {
    text: string;
    listId: string;
  };
}

export interface EditCardAction {
  type: typeof CONSTANTS.EDIT_CARD;
  payload: {
    id: string;
    listId: string;
    newText: string;
  };
}

export interface DeleteCardAction {
  type: typeof CONSTANTS.DELETE_CARD;
  payload: {
    id: string;
    listId: string;
  };
}

export interface ToggleCardDoneAction {
  type: typeof CONSTANTS.TOGGLE_CARD_DONE;
  payload: {
    listId: string;
    cardId: string;
  };
}

export const addCard = (listId: string, text: string): AddCardAction => {
  return {
    type: CONSTANTS.ADD_CARD,
    payload: { text, listId },
  };
};

export const editCard = (
  id: string,
  listId: string,
  newText: string
): EditCardAction => {
  return {
    type: CONSTANTS.EDIT_CARD,
    payload: { id, listId, newText },
  };
};

export const deleteCard = (id: string, listId: string): DeleteCardAction => {
  return {
    type: CONSTANTS.DELETE_CARD,
    payload: { id, listId },
  };
};

export const toggleCardDone = (listId: string, cardId: string): ToggleCardDoneAction => {
  return {
    type: CONSTANTS.TOGGLE_CARD_DONE,
    payload: { listId, cardId },
  };
};