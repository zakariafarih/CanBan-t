import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { sort } from "../actions/listActions";
import ActionButton from "../components/ActionButton";
import List from "../components/List";
import "./BoardView.css";
import { RootState } from "../reducers";

interface BoardViewProps {
  lists: any[];
  dispatch?: any;
  searchTerm?: string; 
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

function mapStateToProps(state: RootState) {
  const activeCatId = state.categoriesState.activeCategoryId;
  const category = state.categoriesState.categories.find(
    (c) => c.id === activeCatId
  );
  return {
    categoryId: activeCatId,
    lists: category ? category.lists : [],
  };
}

export default connect(mapStateToProps)(BoardView);