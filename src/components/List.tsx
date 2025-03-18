import React, { useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { connect } from "react-redux";
import TextArea from "react-textarea-autosize";
import { Button, Dropdown } from "react-bootstrap";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { editTitle, deleteList } from "../actions";
import ActionButton from "../components/ActionButton";
import ListCard from "../components/ListCard";
import "./List.css";

interface ListProps {
  title: string;
  cards: any[];
  listId: string;
  index: number;
  dispatch?: any;
}

const List: React.FC<ListProps> = ({ title, cards, listId, index, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [listTitle, setListTitle] = useState(title);
  const [draftTitle, setDraftTitle] = useState(title);

  const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    e.target.select();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDraftTitle(e.target.value);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setDraftTitle(listTitle);
  };

  const handleFinishEditing = () => {
    setIsEditing(false);
    setListTitle(draftTitle);
    if (dispatch) {
      dispatch(editTitle(listId, draftTitle));
    }
  };

  const handleDeleteList = () => {
    if (dispatch) {
      dispatch(deleteList(listId));
    }
  };

  const renderEditInput = () => (
    <div className="list-edit-container">
      <TextArea
        placeholder="Enter title"
        value={draftTitle}
        onChange={handleChange}
        onFocus={handleFocus}
        className="list-edit-textarea"
      />
      <div className="list-edit-btns">
        <Button variant="success" onMouseDown={handleFinishEditing}>
          Update
        </Button>
        <Button variant="secondary" onMouseDown={handleCancel}>
          X
        </Button>
      </div>
    </div>
  );

  return (
    <Draggable draggableId={String(listId)} index={index}>
      {(provided) => (
        <div
          className="list-container"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={String(listId)} type="card">
            {(providedDroppable) => (
              <div
                className="list-droppable-area"
                ref={providedDroppable.innerRef}
                {...providedDroppable.droppableProps}
              >
                <div className="list-header">
                  {isEditing ? (
                    renderEditInput()
                  ) : (
                    <div className="list-header-top">
                      <h3>{listTitle}</h3>
                      <Dropdown>
                        <Dropdown.Toggle id="dropdown-no-caret" className="list-dropdown-btn">
                          <FontAwesomeIcon icon={faEdit} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => setIsEditing(true)}>Edit</Dropdown.Item>
                          <Dropdown.Item onClick={handleDeleteList}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  )}
                </div>
                {cards.map((card, idx) => (
                  <ListCard
                    key={card.id}
                    listId={listId}
                    index={idx}
                    id={card.id}
                    text={card.text}
                    done={card.done}
                    group={card.group}
                  />
                ))}
                {providedDroppable.placeholder}
                <ActionButton listId={listId} />
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default connect()(List);