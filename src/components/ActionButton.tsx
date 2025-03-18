import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { addList, addCard } from "../actions";
import InputForm from "../components/InputForm";
import "./ActionButton.css";

interface ActionButtonProps {
  list?: boolean;
  listId?: string;
  dispatch?: any;
}

interface ActionButtonState {
  formOpen: boolean;
  text: string;
}

class ActionButton extends PureComponent<ActionButtonProps, ActionButtonState> {
  state: ActionButtonState = {
    formOpen: false,
    text: ""
  };

  setOpen = () => {
    this.setState({ formOpen: true });
  };

  closeForm = () => {
    this.setState({ formOpen: false });
  };

  handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ text: e.target.value });
  };

  handleAddList = () => {
    const { dispatch } = this.props;
    const { text } = this.state;
    if (text && dispatch) {
      dispatch(addList(text));
      this.setState({ text: "" });
    }
  };

  handleAddCard = () => {
    const { dispatch, listId } = this.props;
    const { text } = this.state;
    if (text && dispatch && listId) {
      dispatch(addCard(listId, text));
      this.setState({ text: "" });
    }
  };

  renderAddButton = () => {
    const { list } = this.props;
    const buttonText = list ? "Add another list" : "Add another card";
    const className = list ? "action-btn-list" : "action-btn-card";
    return (
      <div className={className} onClick={this.setOpen}>
        + {buttonText}
      </div>
    );
  };

  renderForm = () => {
    const { list } = this.props;
    const placeholder = list ? "Enter List title" : "Write down your next task";
    const buttonTitle = list ? "Add List" : "Add Card";

    return (
      <div className="action-form-wrapper">
        <InputForm
          placeholder={placeholder}
          buttonTitle={buttonTitle}
          handleAddList={this.handleAddList}
          text={this.state.text}
          onChange={this.handleInputChange}
          closeForm={this.closeForm}
          handleAddCard={this.handleAddCard}
          list={!!list}
        />
      </div>
    );
  };

  render() {
    return this.state.formOpen ? this.renderForm() : this.renderAddButton();
  }
}

export default connect()(ActionButton);