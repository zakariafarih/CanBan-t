import React, { useState } from "react";
import { Card, Button, Dropdown } from "react-bootstrap";
import { Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import { editCard, deleteCard } from "../actions/cardActions";
import TextArea from "react-textarea-autosize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import "./ListCard.css";

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
  const [isEditing, setIsEditing] = useState(false);
  const [cardText, setCardText] = useState(text);

  const closeForm = () => setIsEditing(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCardText(e.target.value);
  };

  const saveCard = () => {
    if (dispatch) {
      dispatch(editCard(id, listId, cardText));
    }
    setIsEditing(false);
  };

  const handleDeleteCard = () => {
    if (dispatch) {
      dispatch(deleteCard(id, listId));
    }
  };

  const renderEditForm = () => (
    <div className="listcard-edit-form">
      <Card style={{ minHeight: 80, minWidth: 270 }}>
        <TextArea
          placeholder="Enter text here"
          autoFocus
          value={cardText}
          onChange={handleChange}
          onBlur={() => null}
          className="listcard-edit-textarea"
        />
      </Card>
      <div className="listcard-edit-btns">
        <Button variant="success" onClick={saveCard}>
          Save
        </Button>
        <Button variant="secondary" onClick={closeForm}>
          X
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