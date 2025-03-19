import React, { useState, ChangeEvent } from "react";
import { connect } from "react-redux";
import { Accordion, Form, Button, Badge } from "react-bootstrap";
import { addList, editTitle, deleteList, addCard, deleteCard } from "../actions";
import TodoItem from "../components/TodoItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faTasks,
  faLayerGroup,
  faCheckCircle,
  faTimesCircle,
  faStickyNote,
} from "@fortawesome/free-solid-svg-icons";
import "./ListView.css";

interface ListViewProps {
  categoryId: string;
  lists: any[];
  dispatch?: any;
  searchTerm: string;
}

const ListView: React.FC<ListViewProps> = ({
  categoryId,
  lists = [],
  dispatch,
  searchTerm,
}) => {
  const [newListTitle, setNewListTitle] = useState("");
  const [editingListId, setEditingListId] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState("");
  const [newTaskText, setNewTaskText] = useState("");
  const [taskListId, setTaskListId] = useState<string>("");

  // Filter lists based on the searchTerm prop
  const filteredLists = lists
    .map((list: any) => {
      const titleMatch = list.title.toLowerCase().includes(searchTerm.toLowerCase());
      const filteredCards = list.cards.filter((c: any) =>
        c.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (c.groups && c.groups.join(" ").toLowerCase().includes(searchTerm.toLowerCase()))
      );
      if (!titleMatch && filteredCards.length === 0) return null;
      return { ...list, cards: filteredCards };
    })
    .filter(Boolean);

  const handleAddList = () => {
    if (!newListTitle.trim() || !dispatch) return;
    dispatch(addList(categoryId, newListTitle));
    setNewListTitle("");
  };

  const handleEditList = (listId: string, currentTitle: string) => {
    setEditingListId(listId);
    setDraftTitle(currentTitle);
  };

  const handleSaveListTitle = (listId: string) => {
    if (!draftTitle.trim() || !dispatch) {
      setEditingListId(null);
      return;
    }
    dispatch(editTitle(categoryId, listId, draftTitle));
    setEditingListId(null);
  };

  const handleCancelEdit = () => {
    setEditingListId(null);
    setDraftTitle("");
  };

  const handleDeleteList = (listId: string) => {
    if (!dispatch) return;
    dispatch(deleteList(categoryId, listId));
  };

  const handleAddTask = (listId: string) => {
    if (!newTaskText.trim() || !dispatch) return;
    dispatch(addCard(categoryId, listId, newTaskText));
    setNewTaskText("");
    setTaskListId("");
  };

  const handleDeleteTask = (taskId: string, listId: string) => {
    if (!dispatch) return;
    dispatch(deleteCard(categoryId, listId, taskId));
  };

  return (
    <div className="accordion-listview-container">
      <div className="accordion-listview-header">
        <div className="header-content">
          <FontAwesomeIcon icon={faLayerGroup} className="header-icon" />
          <h2 className="accordion-listview-title">Task Collections</h2>
        </div>
        {/* The search input has been removed here since App handles it */}
        <div className="new-list-row">
          <Form.Control
            type="text"
            placeholder="Create new list..."
            value={newListTitle}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewListTitle(e.target.value)}
            className="new-list-input"
          />
          <Button variant="primary" onClick={handleAddList} className="new-list-btn">
            <FontAwesomeIcon icon={faPlus} /> Create List
          </Button>
        </div>
      </div>

      <Accordion defaultActiveKey="0" className="lists-accordion">
        {filteredLists.length > 0 ? (
          filteredLists.map((list: any, idx: number) => {
            if (!list) return null;
            const isEditing = list.id === editingListId;
            return (
              <Accordion.Item eventKey={String(idx)} key={list.id} className="list-accordion-item">
                <Accordion.Header>
                  {isEditing ? (
                    <div className="edit-list-title">
                      <Form.Control
                        type="text"
                        value={draftTitle}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setDraftTitle(e.target.value)}
                        className="edit-list-input"
                        autoFocus
                      />
                      <div className="edit-actions">
                        <Button 
                          variant="success" 
                          size="sm" 
                          onClick={() => handleSaveListTitle(list.id)}
                          className="edit-btn edit-btn-save"
                        >
                          <FontAwesomeIcon icon={faCheckCircle} /> Save
                        </Button>
                        <Button 
                          variant="secondary" 
                          size="sm" 
                          onClick={handleCancelEdit}
                          className="edit-btn edit-btn-cancel"
                        >
                          <FontAwesomeIcon icon={faTimesCircle} /> Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="list-header-row">
                      <div className="list-header-left">
                        <FontAwesomeIcon icon={faStickyNote} className="list-icon" />
                        <span className="list-name">{list.title}</span>
                        <Badge bg="info" className="task-count">
                          {list.cards.length} tasks
                        </Badge>
                      </div>
                      <div className="list-header-actions">
                        <Button variant="outline-secondary" size="sm" onClick={(e) => {
                          e.stopPropagation();
                          handleEditList(list.id, list.title);
                        }}>
                          <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteList(list.id);
                        }}>
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
                        groups={card.groups}
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
                      className="add-task-btn"
                    >
                      <FontAwesomeIcon icon={faPlus} /> Add Task
                    </Button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            );
          })
        ) : (
          <div className="empty-state">
            <div className="empty-state-content">
              <FontAwesomeIcon icon={faTasks} className="empty-state-icon" />
              <h3>No Lists Found</h3>
              <p>Create your first list to get started organizing your tasks.</p>
              <Button variant="primary" onClick={() => document.querySelector('.new-list-input')?.focus()}>
                <FontAwesomeIcon icon={faPlus} /> Create First List
              </Button>
            </div>
          </div>
        )}
      </Accordion>
    </div>
  );
};

function mapStateToProps(state: any) {
  const category = state.categoriesState.categories.find(
    (c: any) => c.id === state.categoriesState.activeCategoryId
  );
  return {
    categoryId: state.categoriesState.activeCategoryId,
    lists: category ? category.lists : [],
  };
}

export default connect(mapStateToProps)(ListView);
