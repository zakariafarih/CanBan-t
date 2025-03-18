import React, { useState } from "react";
import { connect } from "react-redux";
import { addCategory, editCategory, deleteCategory, setActiveCategory } from "../actions";
import { RootState } from "../reducers";
import { Button, Form, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import "./CategoryLanding.css"; 

interface CategoryLandingProps {
  categories: any[];
  activeCategoryId: string | null;
  dispatch?: any;
  onCategoryChosen: () => void; 
}

const CategoryLanding: React.FC<CategoryLandingProps> = ({
  categories,
  activeCategoryId,
  dispatch,
  onCategoryChosen
}) => {
  const [newCatName, setNewCatName] = useState("");
  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [draftCatName, setDraftCatName] = useState("");

  const handleAddCategory = () => {
    if (!newCatName.trim() || !dispatch) return;
    dispatch(addCategory(newCatName));
    setNewCatName("");
  };

  const handleSelectCategory = (catId: string) => {
    dispatch(setActiveCategory(catId));
    onCategoryChosen();
  };

  const handleEditCategory = (catId: string, currentName: string) => {
    setEditingCatId(catId);
    setDraftCatName(currentName);
  };

  const handleSaveCategory = (catId: string) => {
    if (!draftCatName.trim()) {
      setEditingCatId(null);
      return;
    }
    dispatch(editCategory(catId, draftCatName));
    setEditingCatId(null);
  };

  const handleDeleteCategory = (catId: string) => {
    dispatch && dispatch(deleteCategory(catId));
  };

  return (
    <div className="category-landing-container">
      <h1 className="category-landing-title">Select a Category</h1>

      <div className="category-landing-new d-flex gap-2 mb-4">
        <Form.Control
          type="text"
          placeholder="Create new category"
          value={newCatName}
          onChange={(e) => setNewCatName(e.target.value)}
        />
        <Button variant="primary" onClick={handleAddCategory}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </div>

      <div className="category-list">
        {categories.map((cat) => {
          const isEditing = cat.id === editingCatId;
          return (
            <Card className="mb-3 category-card" key={cat.id}>
              <Card.Body className="d-flex justify-content-between align-items-center">
                {isEditing ? (
                  <div className="d-flex align-items-center gap-2" style={{ width: "100%" }}>
                    <Form.Control
                      autoFocus
                      type="text"
                      value={draftCatName}
                      onChange={(e) => setDraftCatName(e.target.value)}
                    />
                    <Button variant="success" size="sm" onClick={() => handleSaveCategory(cat.id)}>
                      Save
                    </Button>
                    <Button variant="outline-secondary" size="sm" onClick={() => setEditingCatId(null)}>
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <>
                    <div>
                      <strong>{cat.name}</strong>
                    </div>
                    <div className="d-flex gap-2">
                      <Button variant="outline-secondary" size="sm" onClick={() => handleEditCategory(cat.id, cat.name)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDeleteCategory(cat.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                      <Button variant="primary" size="sm" onClick={() => handleSelectCategory(cat.id)}>
                        <FontAwesomeIcon icon={faSignInAlt} /> Enter
                      </Button>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

function mapStateToProps(state: RootState) {
  return {
    categories: state.categoriesState.categories,
    activeCategoryId: state.categoriesState.activeCategoryId,
  };
}

export default connect(mapStateToProps)(CategoryLanding);
