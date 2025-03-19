import React, { useState } from "react";
import { motion } from "framer-motion";
import { faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect, useSelector } from "react-redux";
import { toggleCardDone, editCard } from "../actions";
import { RootState } from "../reducers";
import "./TodoItem.css";
import "../components/AppleSwitch.css";

interface TodoItemProps {
  id: string;
  text: string;
  listId: string;
  done?: boolean;
  groups?: string[];
  deleteItem: (id: string, listId: string) => void;
  dispatch?: any;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  text,
  listId,
  done = false,
  groups = [],
  deleteItem,
  dispatch,
}) => {
  const activeCategoryId = useSelector(
    (state: RootState) => state.categoriesState.activeCategoryId
  );

  const [isEditing, setIsEditing] = useState(false);
  const [draftText, setDraftText] = useState(text);
  const [draftGroups, setDraftGroups] = useState<string[]>(groups);
  const [newGroup, setNewGroup] = useState("");

  const onDeleteItem = () => {
    deleteItem(id, listId);
  };

  const onToggleDone = () => {
    if (!activeCategoryId) return;
    dispatch(toggleCardDone(activeCategoryId, listId, id));
  };

  const handleAddGroup = () => {
    const trimmed = newGroup.trim();
    if (!trimmed) return;
    if (!draftGroups.includes(trimmed)) {
      setDraftGroups([...draftGroups, trimmed]);
    }
    setNewGroup("");
  };

  const handleRemoveGroup = (grp: string) => {
    setDraftGroups(draftGroups.filter((g) => g !== grp));
  };

  const onSaveEdit = () => {
    if (!activeCategoryId) return;
    dispatch(editCard(activeCategoryId, listId, id, draftText, draftGroups));
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
          <div className="chip-list">
            {draftGroups.map((grp) => (
              <div key={grp} className="chip">
                {grp} <button onClick={() => handleRemoveGroup(grp)}>&times;</button>
              </div>
            ))}
          </div>
          <div className="todoitem-group-input">
            <input
              className="todoitem-edit-input"
              value={newGroup}
              onChange={(e) => setNewGroup(e.target.value)}
              placeholder="Add new group..."
            />
            <button onClick={handleAddGroup} className="chip-add-btn">
              Add
            </button>
          </div>
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
            <div className="chip-list">
              {groups.map((grp) => (
                <div key={grp} className="chip read-only">
                  {grp}
                </div>
              ))}
            </div>
          </div>
          <div className="todoitem-actions">
            {/* Apple-style switch */}
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
