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

  const handleConfirm = () => {
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
          className="inputform-textarea"
        />
      </Card>
      <div className="inputform-buttons">
        <Button
          variant="primary"
          onMouseDown={handleConfirm}
          className="inputform-save-btn"
        >
          {buttonTitle}
        </Button>
        <Button
          variant="outline-danger"
          onMouseDown={closeForm}
          className="inputform-cancel-btn"
        >
          <FontAwesomeIcon icon={faTimes} />
        </Button>
      </div>
    </div>
  );
});

export default InputForm;
