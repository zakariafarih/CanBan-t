import React from "react";
import { Button, Card } from "react-bootstrap";
import TextArea from "react-textarea-autosize";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./InputForm.css";

interface InputFormProps {
  list: boolean;
  text: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  closeForm: () => void;
  buttonTitle: string;
  placeholder: string;
  handleAddCard: () => void;
  handleAddList: () => void;
}

const InputForm = React.memo((props: InputFormProps) => {
  const {
    list,
    text,
    onChange,
    closeForm,
    buttonTitle,
    placeholder,
    handleAddCard,
    handleAddList,
  } = props;

  const handleClick = () => {
    if (list) {
      handleAddList();
    } else {
      handleAddCard();
    }
  };

  return (
    <div className="inputform-container">
      <Card className="inputform-card">
        <TextArea
          placeholder={placeholder}
          autoFocus
          value={text}
          onChange={onChange}
          onBlur={closeForm}
          className="inputform-textarea"
        />
      </Card>
      <div className="inputform-buttons">
        <Button variant="success" onMouseDown={handleClick}>
          {buttonTitle}
        </Button>
        <Button className="inputform-close-btn">
          <FontAwesomeIcon icon={faTimes} color="white" />
        </Button>
      </div>
    </div>
  );
});

export default InputForm;