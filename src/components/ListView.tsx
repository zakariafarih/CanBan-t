import React, { useState } from "react";
import { connect } from "react-redux";
import { Accordion, Form, Button } from "react-bootstrap";
import {
  addList,
  editTitle,
  deleteList,
  addCard,
  deleteCard,
} from "../actions";
import TodoItem from "../components/TodoItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./ListView.css";

interface ListViewProps {
  categoryId: string;
  lists: any[];
  dispatch?: any;
  searchTerm?: string;
}

const ListView: React.FC<ListViewProps> = ({
  categoryId,
  lists = [],
  dispatch,
  searchTerm = "",
}) => {
  // For new list creation
  const [newListTitle, setNewListTitle] = useState("");

  // Local state for editing list titles
  const [editingListId, setEditingListId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState("");

  // For adding tasks to a specific list
  const [newTaskText, setNewTaskText] = useState("");
  const [taskListId, setTaskListId] = useState<string>("");

  // Filter lists by search term (if provided)
  const filteredLists = lists
    .map((list: any) => {
      const titleMatch = list.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const filteredCards = list.cards.filter((c: any) =>
        c.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.group && c.group.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      if (!titleMatch && filteredCards.length === 0) return null;
      return { ...list, cards: filteredCards };
    })
    .filter(Boolean);

  // Create a new list within this category
  const handleAddList = () => {
    if (!newListTitle.trim() || !dispatch) return;
    // Call action with categoryId and newListTitle
    dispatch(addList(categoryId, newListTitle));
    setNewListTitle("");
  };

  // Start editing a list's title
  const handleEditList = (listId: string, currentTitle: string) => {
    setEditingListId(listId);
    setDraftTitle(currentTitle);
  };

  // Save the new list title (action now requires categoryId)
  const handleSaveListTitle = (listId: string) => {
    if (!draftTitle.trim() || !dispatch) {
      setEditingListId(null);
      return;
    }
    dispatch(editTitle(categoryId, listId, draftTitle));
    setEditingListId(null);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingListId(null);
    setDraftTitle("");
  };

  // Delete entire list (action requires categoryId)
  const handleDeleteList = (listId: string) => {
    if (!dispatch) return;
    dispatch(deleteList(categoryId, listId));
  };

  // Add a new task (card) to a list (action requires categoryId)
  const handleAddTask = (listId: string) => {
    if (!newTaskText.trim() || !dispatch) return;
    dispatch(addCard(categoryId, listId, newTaskText));
    setNewTaskText("");
    setTaskListId("");
  };

  // Delete a single task (action requires categoryId)
  const handleDeleteTask = (taskId: string, listId: string) => {
    if (!dispatch) return;
    dispatch(deleteCard(categoryId, listId, taskId));
  };

  return (
    <div className="accordion-listview-container">
      <div className="accordion-listview-header">
        <h2 className="accordion-listview-title">All Lists</h2>
        <div className="new-list-row">
          <Form.Control
            type="text"
            placeholder="New list title"
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
            className="new-list-input"
          />
          <Button variant="primary" onClick={handleAddList} className="new-list-btn">
            <FontAwesomeIcon icon={faPlus} /> Add List
          </Button>
        </div>
      </div>

      <Accordion defaultActiveKey="">
        {filteredLists.length > 0 ? (
          filteredLists.map((list: any, idx: number) => {
            if (!list) return null;
            const isEditing = list.id === editingListId;
            return (
              <Accordion.Item
                eventKey={String(idx)}
                key={list.id}
                className="list-accordion-item"
              >
                <Accordion.Header>
                  {isEditing ? (
                    <div className="edit-list-title">
                      <Form.Control
                        type="text"
                        value={draftTitle}
                        onChange={(e) => setDraftTitle(e.target.value)}
                        className="edit-list-input"
                        autoFocus
                      />
                      <Button variant="success" size="sm" onClick={() => handleSaveListTitle(list.id)}>
                        Save
                      </Button>
                      <Button variant="secondary" size="sm" onClick={handleCancelEdit}>
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="list-header-row">
                      <span className="list-name">{list.title}</span>
                      <div className="list-header-actions">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditList(list.id, list.title);
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteList(list.id);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </div>
                    </div>
                  )}
                </Accordion.Header>
                <Accordion.Body>
                  <div className="task-list">
                    {list.cards.map((card: any) => (
                      <TodoItem
                        key={card.id}
                        id={card.id}
                        text={card.text}
                        listId={list.id}
                        done={card.done}
                        group={card.group}
                        deleteItem={handleDeleteTask}
                      />
                    ))}
                  </div>
                  <div className="add-task-row">
                    <Form.Control
                      type="text"
                      placeholder="Add a new task..."
                      value={list.id === taskListId ? newTaskText : ""}
                      onChange={(e) => {
                        setNewTaskText(e.target.value);
                        setTaskListId(list.id);
                      }}
                      onClick={() => setTaskListId(list.id)}
                    />
                    <Button
                      variant="success"
                      onClick={() => handleAddTask(list.id)}
                      disabled={taskListId !== list.id}
                    >
                      <FontAwesomeIcon icon={faPlus} /> Add
                    </Button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            );
          })
        ) : (
          <div className="empty-state">
            <svg
              className="empty-state-icon"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10.185 0C4.567 0 .042 4.42.042 9.833c0 5.412 4.525 9.833 10.143 9.833s10.143-4.42 10.143-9.833C20.328 4.42 15.704 0 10.185 0zm-.03 17.709c-2.077 0-4.03-.797-5.53-2.245.21-.384.398-.77.563-1.156.39-.927.924-2.197 1.497-2.197.13 0 .646.065 1.33.27.602.181 1.324.397 2.14.397.816 0 1.538-.216 2.14-.397.683-.205 1.2-.27 1.33-.27.573 0 1.106 1.27 1.497 2.197.165.386.353.772.563 1.156-1.5 1.448-3.453 2.245-5.53 2.245z" />
            </svg>
            <h3>No Lists Found</h3>
            <p>Use the form above to create a new list.</p>
          </div>
        )}
      </Accordion>
    </div>
  );
};

function mapStateToProps(state: any, ownProps: any) {
  const category = state.categoriesState.categories.find((c: any) => c.id === ownProps.categoryId);
  return { lists: category ? category.lists : [] };
}

export default connect(mapStateToProps)(ListView);
