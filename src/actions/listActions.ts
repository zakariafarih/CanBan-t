import { CONSTANTS } from "./index";

export interface AddListAction {
  type: typeof CONSTANTS.ADD_LIST;
  payload: string;
}

export interface SortAction {
  type: typeof CONSTANTS.DRAG_HAPPENED;
  payload: {
    droppableIdStart: string;
    droppableIdEnd: string;
    droppableIndexStart: number;
    droppableIndexEnd: number;
    draggableId: string;
    type: string;
  };
}

export interface EditTitleAction {
  type: typeof CONSTANTS.EDIT_LIST_TITLE;
  payload: {
    listId: string;
    newTitle: string;
  };
}

export interface DeleteListAction {
  type: typeof CONSTANTS.DELETE_LIST;
  payload: {
    listId: string;
  };
}

export const addList = (title: string): AddListAction => {
  return {
    type: CONSTANTS.ADD_LIST,
    payload: title,
  };
};

export const sort = (
  droppableIdStart: string,
  droppableIdEnd: string,
  droppableIndexStart: number,
  droppableIndexEnd: number,
  draggableId: string,
  type: string
): SortAction => {
  return {
    type: CONSTANTS.DRAG_HAPPENED,
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd,
      draggableId,
      type,
    },
  };
};

export const editTitle = (
  listId: string,
  newTitle: string
): EditTitleAction => {
  return {
    type: CONSTANTS.EDIT_LIST_TITLE,
    payload: {
      listId,
      newTitle,
    },
  };
};

export const deleteList = (listId: string): DeleteListAction => {
  return {
    type: CONSTANTS.DELETE_LIST,
    payload: {
      listId,
    },
  };
};