import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";
import { Card } from "react-bootstrap";
import "./SavedListsView.css";

const SavedListsView: React.FC = () => {
  const activeCategoryId = useSelector((state: RootState) => state.categoriesState.activeCategoryId);
  const category = useSelector((state: RootState) =>
    state.categoriesState.categories.find((cat) => cat.id === activeCategoryId)
  );
  const lists = category ? category.lists : [];

  if (!activeCategoryId) {
    return (
      <div className="savedlists-container">
        <h2>No Category Selected</h2>
        <p>Please choose a Category first.</p>
      </div>
    );
  }

  return (
    <div className="savedlists-container">
      <h2>All Lists in “{category?.name}”</h2>
      <p className="text-muted">You can review all your lists below.</p>
      <div className="savedlists-grid">
        {lists.map((lst: any) => {
          const doneCount = lst.cards.filter((c: any) => c.done).length;
          return (
            <Card key={lst.id} className="savedlists-item-card">
              <Card.Body>
                <Card.Title>{lst.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {lst.cards.length} tasks / {doneCount} completed
                </Card.Subtitle>
                <hr />
                {lst.cards.slice(0, 3).map((c: any) => (
                  <div key={c.id} style={{ fontSize: "0.9rem" }}>
                    <span style={{ textDecoration: c.done ? "line-through" : "none" }}>
                      {c.text}
                    </span>
                    {c.groups && c.groups.length > 0 && (
                      <div style={{ marginLeft: "1rem", color: "#6b7280" }}>
                        <small>Groups: {c.groups.join(", ")}</small>
                      </div>
                    )}
                  </div>
                ))}
                {lst.cards.length > 3 && <small>...and more!</small>}
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SavedListsView;
