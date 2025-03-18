import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { sort } from "../actions/listActions";
import ActionButton from "../components/ActionButton";
import List from "../components/List";
import "./BoardView.css";

interface BoardViewProps {
  lists: any[];
  dispatch?: any;
  searchTerm?: string; // optional search
}

class BoardView extends PureComponent<BoardViewProps> {
  onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    if (this.props.dispatch) {
      this.props.dispatch(
        sort(
          source.droppableId,
          destination.droppableId,
          source.index,
          destination.index,
          draggableId,
          type!
        )
      );
    }
  };

  /** 
   * If you want to filter cards by searchTerm, do it here. 
   * For simplicity, ignoring searchTerm in BoardView. 
   */

  render() {
    const { lists } = this.props;
    return (
      <div className="boardview-container">
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="all-lists" direction="horizontal" type="list">
            {(provided) => (
              <div
                className="boardview-list-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {lists.map((lst, index) => (
                  <List
                    key={lst.id}
                    listId={lst.id}
                    title={lst.title}
                    cards={lst.cards}
                    index={index}
                  />
                ))}
                {provided.placeholder}
                <ActionButton list />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  lists: state.lists,
});

export default connect(mapStateToProps)(BoardView);