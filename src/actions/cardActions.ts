import { CONSTANTS } from "./index";

export interface AddCardAction {
  type: typeof CONSTANTS.ADD_CARD;
  payload: {
    categoryId: string;
    listId: string;
    text: string;
    groups?: string[];
  };
}

export interface EditCardAction {
  type: typeof CONSTANTS.EDIT_CARD;
  payload: {
    categoryId: string;
    listId: string;
    id: string;
    newText: string;
    newGroups?: string[];
  };
}

export interface DeleteCardAction {
  type: typeof CONSTANTS.DELETE_CARD;
  payload: {
    categoryId: string;
    listId: string;
    id: string;
  };
}

export interface ToggleCardDoneAction {
  type: typeof CONSTANTS.TOGGLE_CARD_DONE;
  payload: {
    categoryId: string;
    listId: string;
    cardId: string;
  };
}

export const addCard = (
  categoryId: string,
  listId: string,
  text: string,
  groups: string[] = []
): AddCardAction => ({
  type: CONSTANTS.ADD_CARD,
  payload: { categoryId, listId, text, groups },
});

export const editCard = (
  categoryId: string,
  listId: string,
  cardId: string,
  newText: string,
  newGroups?: string[]
): EditCardAction => ({
  type: CONSTANTS.EDIT_CARD,
  payload: { categoryId, listId, id: cardId, newText, newGroups },
});

export const deleteCard = (
  categoryId: string,
  listId: string,
  cardId: string
): DeleteCardAction => ({
  type: CONSTANTS.DELETE_CARD,
  payload: { categoryId, listId, id: cardId },
});

export const toggleCardDone = (
  categoryId: string,
  listId: string,
  cardId: string
): ToggleCardDoneAction => ({
  type: CONSTANTS.TOGGLE_CARD_DONE,
  payload: { categoryId, listId, cardId },
});
