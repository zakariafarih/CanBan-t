import { CONSTANTS } from "./index";

export interface AddListAction {
  type: typeof CONSTANTS.ADD_LIST;
  payload: {
    categoryId: string;
    listTitle: string;
  };
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
    categoryId: string;
    listId: string;
    newTitle: string;
  };
}

export interface DeleteListAction {
  type: typeof CONSTANTS.DELETE_LIST;
  payload: {
    categoryId: string;
    listId: string;
  };
}

export const addList = (categoryId: string, listTitle: string): AddListAction => ({
  type: CONSTANTS.ADD_LIST,
  payload: { categoryId, listTitle },
});

export const sort = (
  droppableIdStart: string,
  droppableIdEnd: string,
  droppableIndexStart: number,
  droppableIndexEnd: number,
  draggableId: string,
  type: string
): SortAction => ({
  type: CONSTANTS.DRAG_HAPPENED,
  payload: {
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    draggableId,
    type,
  },
});

export const editTitle = (
  categoryId: string,
  listId: string,
  newTitle: string
): EditTitleAction => ({
  type: CONSTANTS.EDIT_LIST_TITLE,
  payload: { categoryId, listId, newTitle },
});

export const deleteList = (categoryId: string, listId: string): DeleteListAction => ({
  type: CONSTANTS.DELETE_LIST,
  payload: { categoryId, listId },
});
