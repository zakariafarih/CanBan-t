import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import "./SavedListsView.css";

const SavedListsView: React.FC = () => {
  const activeCategoryId = useSelector((state: RootState) => state.categoriesState.activeCategoryId);
  const category = useSelector((state: RootState) =>
    state.categoriesState.categories.find((cat) => cat.id === activeCategoryId)
  );
  const lists = category ? category.lists : [];

  return (
    <div className="savedlists-container">
      <h2>All Lists</h2>
      <p className="text-muted">
        Below are all saved lists for the selected category:
      </p>
      <ul className="savedlists-list">
        {lists.map((lst: any) => (
          <li key={lst.id} className="savedlists-item">
            <strong>{lst.title}</strong> ({lst.cards.length} tasks)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedListsView;
