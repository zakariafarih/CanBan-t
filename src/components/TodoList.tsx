import React, { Component } from "react";
import TodoItem from "../components/TodoItem";
import "./TodoList.css";

interface TodoListProps {
  lists: any[];
  deleteItem: (id: string, listId: string) => void;
  listId: string;
}

class TodoList extends Component<TodoListProps> {
  render() {
    const { lists, deleteItem } = this.props;
    return (
      <div className="todolist-wrapper">
        {lists.map((list) => (
          <div key={list.id} className="todolist-list-block">
            {list.cards.map((card: any) => (
              <TodoItem
                key={card.id}
                id={card.id}
                text={card.text}
                listId={list.id}
                done={card.done}
                group={card.group}
                deleteItem={deleteItem}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default TodoList;