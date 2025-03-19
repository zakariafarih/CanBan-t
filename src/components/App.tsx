import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Container, Nav, Navbar, Button, Modal, Form } from "react-bootstrap";
import BoardView from "./BoardView";
import ListView from "./ListView";
import SavedListsView from "./SavedListsView";
import CategoryLanding from "./CategoryLanding";
import { RootState } from "../reducers";
import { faTable, faList, faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

type ScreenType = "list" | "board" | "saved-lists";

interface AppProps {
  lists?: any[];
  activeCategoryId?: string | null;
}

interface AppState {
  activeScreen: ScreenType;
  showModal: boolean;
  modalMode: "newList" | "newTask";
  searchTerm: string;
  onLanding: boolean;
}

class App extends PureComponent<AppProps, AppState> {
  state: AppState = {
    activeScreen: "list",
    showModal: false,
    modalMode: "newList",
    searchTerm: "",
    onLanding: true,
  };

  handleCategoryChosen = () => {
    this.setState({ onLanding: false });
  };

  handleNavSelect = (selectedKey: string | null) => {
    if (!selectedKey) return;
    this.setState({ activeScreen: selectedKey as ScreenType });
  };

  handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  openModal = (mode: "newList" | "newTask") => {
    this.setState({ showModal: true, modalMode: mode });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  handleModalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: implement if needed
    this.closeModal();
  };

  renderMainContent() {
    const { activeScreen, searchTerm } = this.state;
    switch (activeScreen) {
      case "list":
        return <ListView searchTerm={searchTerm} />;
      case "board":
        return <BoardView searchTerm={searchTerm} />;
      case "saved-lists":
      default:
        return <SavedListsView />;
    }
  }

  render() {
    if (this.state.onLanding || !this.props.activeCategoryId) {
      return <CategoryLanding onCategoryChosen={this.handleCategoryChosen} />;
    }

    return (
      <div className="app-wrapper">
        <Navbar bg="light" expand="lg" className="navbar-custom">
          <Container fluid>
            <Navbar.Brand href="#" className="brand-title">
              TaskFlow Pro
            </Navbar.Brand>
            <Nav
              className="me-auto"
              activeKey={this.state.activeScreen}
              onSelect={this.handleNavSelect}
            >
              <Nav.Link eventKey="list" className="nav-link-custom">
                <FontAwesomeIcon icon={faList} /> List
              </Nav.Link>
              <Nav.Link eventKey="board" className="nav-link-custom">
                <FontAwesomeIcon icon={faTable} /> Board
              </Nav.Link>
              <Nav.Link eventKey="saved-lists" className="nav-link-custom">
                <FontAwesomeIcon icon={faBook} /> Saved Lists
              </Nav.Link>
            </Nav>
            <div className="d-flex align-items-center gap-2">
              <Form className="d-flex search-form">
                <Form.Control
                  type="search"
                  placeholder="Search tasks or lists..."
                  className="me-2"
                  aria-label="Search"
                  onChange={this.handleSearchChange}
                  value={this.state.searchTerm}
                />
              </Form>
              <Button variant="outline-info" onClick={() => this.setState({ onLanding: true })}>
                Change Category
              </Button>
            </div>
          </Container>
        </Navbar>
        <Container fluid className="main-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={this.state.activeScreen}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {this.renderMainContent()}
            </motion.div>
          </AnimatePresence>
        </Container>
        <Modal show={this.state.showModal} onHide={this.closeModal} centered>
          <Form onSubmit={this.handleModalSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>
                {this.state.modalMode === "newList" ? "Create New List" : "Add Task"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.state.modalMode === "newList" ? (
                <>
                  <Form.Group className="mb-3" controlId="formNewListTitle">
                    <Form.Label>List Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter list title" />
                  </Form.Group>
                </>
              ) : (
                <>
                  <Form.Group className="mb-3" controlId="formSelectList">
                    <Form.Label>Select List</Form.Label>
                    <Form.Select>
                      {this.props.lists?.map((lst) => (
                        <option key={lst.id} value={lst.id}>
                          {lst.title}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formNewTaskText">
                    <Form.Label>Task Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter your new task" />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formNewTaskGroup">
                    <Form.Label>Task Group (optional)</Form.Label>
                    <Form.Control type="text" placeholder="e.g. Work, Errands..." />
                  </Form.Group>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              {this.state.modalMode === "newList" && (
                <Button variant="outline-secondary" onClick={() => this.openModal("newTask")}>
                  Or Add Task Instead
                </Button>
              )}
              {this.state.modalMode === "newTask" && (
                <Button variant="outline-secondary" onClick={() => this.openModal("newList")}>
                  Or Create New List
                </Button>
              )}
              <Button variant="secondary" onClick={this.closeModal}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    lists: state.lists,
    activeCategoryId: state.categoriesState.activeCategoryId,
  };
}

export default connect(mapStateToProps)(App);
