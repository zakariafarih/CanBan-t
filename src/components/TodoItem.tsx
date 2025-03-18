import React, { useState } from "react";
import { motion } from "framer-motion";
import { faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { toggleCardDone, editCard } from "../actions";
import "./TodoItem.css";
import "../components/AppleSwitch.css";

interface TodoItemProps {
  id: string;
  text: string;
  listId: string;
  done?: boolean;
  group?: string;
  deleteItem: (id: string, listId: string) => void;
  dispatch?: any;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  text,
  listId,
  done = false,
  group = "",
  deleteItem,
  dispatch
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draftText, setDraftText] = useState(text);
  const [draftGroup, setDraftGroup] = useState(group);

  const onDeleteItem = () => {
    deleteItem(id, listId);
  };

  const onToggleDone = () => {
    if (dispatch) {
      dispatch(toggleCardDone(listId, id));
    }
  };

  const onSaveEdit = () => {
    if (dispatch) {
      dispatch(editCard(id, listId, draftText));
      // Optionally handle group changes here if your EDIT_CARD supports it
    }
    setIsEditing(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      className="todoitem-container"
    >
      {isEditing ? (
        <div className="todoitem-edit">
          <input
            className="todoitem-edit-input"
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            placeholder="Edit task text..."
          />
          <input
            className="todoitem-edit-input"
            value={draftGroup}
            onChange={(e) => setDraftGroup(e.target.value)}
            placeholder="Group (optional)"
          />
          <div className="todoitem-edit-btns">
            <button className="todoitem-save-btn" onClick={onSaveEdit}>
              Save
            </button>
            <button className="todoitem-cancel-btn" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="todoitem-content">
          <div className="todoitem-text">
            <span style={{ textDecoration: done ? "line-through" : "none" }}>
              {text}
            </span>
            {group && <small className="todoitem-group">Group: {group}</small>}
          </div>
          <div className="todoitem-actions">
            <label className="switch">
              <input type="checkbox" checked={done} onChange={onToggleDone} />
              <span className="slider round"></span>
            </label>

            <button className="action-btn edit-btn" onClick={() => setIsEditing(true)}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button className="action-btn delete-btn" onClick={onDeleteItem}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default connect()(TodoItem);