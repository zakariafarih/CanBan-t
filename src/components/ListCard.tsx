import React, { useState } from "react";
import { Card, Button, Dropdown } from "react-bootstrap";
import { Draggable } from "react-beautiful-dnd";
import { connect, useSelector } from "react-redux";
import { faCircleCheck, faCircleXmark, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TextArea from "react-textarea-autosize";

import { RootState } from "../reducers";
import { editCard, deleteCard, toggleCardDone } from "../actions/cardActions";
import "./ListCard.css";
import "../components/AppleSwitch.css";

interface ListCardProps {
  text: string;
  listId: string;
  id: string;
  index: number;
  done?: boolean;
  group?: string;
  dispatch?: any;
}

const ListCard: React.FC<ListCardProps> = ({
  text,
  listId,
  id,
  index,
  done,
  group,
  dispatch
}) => {
  const activeCategoryId = useSelector(
    (state: RootState) => state.categoriesState.activeCategoryId
  );

  const [isEditing, setIsEditing] = useState(false);
  const [cardText, setCardText] = useState(text);

  const closeForm = () => setIsEditing(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCardText(e.target.value);
  };

  const saveCard = () => {
    if (!activeCategoryId || !dispatch) return;
    dispatch(editCard(activeCategoryId, listId, id, cardText));
    setIsEditing(false);
  };

  const handleDeleteCard = () => {
    if (!activeCategoryId || !dispatch) return;
    dispatch(deleteCard(activeCategoryId, listId, id));
  };

  const onToggleDone = () => {
    if (!activeCategoryId || !dispatch) return;
    dispatch(toggleCardDone(activeCategoryId, listId, id));
  };

  const renderEditForm = () => (
    <div className="listcard-edit-form">
      <Card style={{ minHeight: 80, minWidth: 270 }}>
        <TextArea
          placeholder="Enter text here"
          autoFocus
          value={cardText}
          onChange={handleChange}
          className="listcard-edit-textarea"
        />
      </Card>
      <div className="listcard-edit-btns">
        <Button
          variant="success"
          size="sm"
          onClick={saveCard}
          className="btn-save"
        >
          <FontAwesomeIcon icon={faCircleCheck} /> Save
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={closeForm}
          className="btn-cancel"
        >
          <FontAwesomeIcon icon={faCircleXmark} /> Cancel
        </Button>
      </div>
    </div>
  );

  const renderCard = () => (
    <Draggable draggableId={String(id)} index={index}>
      {(provided) => (
        <div
          className="listcard-container"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card className="listcard-card">
            <Card.Body>
              <div className="listcard-body-top">
                <div className="listcard-text">
                  <span style={{ textDecoration: done ? "line-through" : "none" }}>
                    {text}
                  </span>
                  {group && (
                    <small className="listcard-group">Group: {group}</small>
                  )}
                </div>
                {/* Apple-style switch for "done" */}
                <label className="switch">
                  <input type="checkbox" checked={done} onChange={onToggleDone} />
                  <span className="slider round"></span>
                </label>

                <Dropdown>
                  <Dropdown.Toggle className="listcard-dropdown-btn">
                    <FontAwesomeIcon icon={faEllipsisV} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setIsEditing(true)}>
                      Edit
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleDeleteCard}>
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Card.Body>
          </Card>
        </div>
      )}
    </Draggable>
  );

  return isEditing ? renderEditForm() : renderCard();
};

export default connect()(ListCard);
