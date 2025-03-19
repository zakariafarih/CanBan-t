import { CONSTANTS } from "./index";

export interface AddCategoryAction {
  type: typeof CONSTANTS.ADD_CATEGORY;
  payload: { categoryName: string };
}

export interface EditCategoryAction {
  type: typeof CONSTANTS.EDIT_CATEGORY;
  payload: { categoryId: string; newName: string };
}

export interface DeleteCategoryAction {
  type: typeof CONSTANTS.DELETE_CATEGORY;
  payload: { categoryId: string };
}

export interface SetActiveCategoryAction {
  type: typeof CONSTANTS.SET_ACTIVE_CATEGORY;
  payload: { categoryId: string | null };
}

export const addCategory = (categoryName: string): AddCategoryAction => ({
  type: CONSTANTS.ADD_CATEGORY,
  payload: { categoryName },
});

export const editCategory = (
  categoryId: string,
  newName: string
): EditCategoryAction => ({
  type: CONSTANTS.EDIT_CATEGORY,
  payload: { categoryId, newName },
});

export const deleteCategory = (categoryId: string): DeleteCategoryAction => ({
  type: CONSTANTS.DELETE_CATEGORY,
  payload: { categoryId },
});

export const setActiveCategory = (
  categoryId: string | null
): SetActiveCategoryAction => ({
  type: CONSTANTS.SET_ACTIVE_CATEGORY,
  payload: { categoryId },
});
