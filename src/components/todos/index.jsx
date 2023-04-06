import React from "react";
import shortid from "shortid";
import { Modal, ModalBody, ModalHeader } from "reactstrap";

import ListView from "../listview";
import TableView from "../tableview";
import CreateTodoForm from "../create-todo-form";
import Controller from "../controlars";

class Todos extends React.Component {
    state = {
        todos: [
            {
                id: "ah18bd",
                text: "main  todo text",
                desription: "simple description",
                time: new Date(),
                isComplete: false,
                isSelect: false
            },
            {
                id: "ah607273",
                text: "main  todo text",
                desription: "simple description",
                time: new Date(),
                isComplete: false,
                isSelect: false
            }
        ],
        isOpenTodoForm: false,
        searchTerm: "",
        view: "list",
        filter: "all"
    };

    toggleSelect = (todoId) => {
        const todos = [...this.state.todos];
        const todo = todos.find((t) => t.id === todoId);
        todo.isSelect = !todo.isSelect;

        this.setState({ todos });
    };

    toggleComplete = (todoId) => {
        const todos = [...this.state.todos];
        const todo = todos.find((t) => t.id === todoId);
        todo.isComplete = !todo.isComplete;

        this.setState({ todos });
    };

    toggleForm = () => {
        this.setState({
            isOpenTodoForm: !this.state.isOpenTodoForm
        });
    };

    handleSearch = (value) => {
        this.setState({ searchTerm: value });
    };

    performSearch = () => {
        return this.state.todos.filter((todo) =>
            todo.text
                .toLowerCase()
                .includes(this.state.searchTerm.toLowerCase())
        );
    };

    createTodo = (todo) => {
        todo.id = shortid.generate();
        todo.time = new Date();
        todo.isComplete = false;
        todo.isSelect = false;

        const todos = [todo, ...this.state.todos];
        this.setState({ todos });
        this.toggleForm();
    };

    handleFilter = (filter) => {
        this.setState({ filter });
    };

    performFilte = (todos) => {
        const { filter } = this.state;
        if (filter === "completed") {
            return todos.filter((todo) => todo.isComplete);
        } else if (filter === "running") {
            return todos.filter((todo) => !todo.isComplete);
        } else {
            return todos;
        }
    };

    changeView = (event) => {
        this.setState({
            view: event.target.value
        });
    };

    clearSelected = () => {
        const todos = this.state.todos.filter((todo) => !todo.isSelect);
        this.setState({ todos });
    };

    clearCompleted = () => {
        const todos = this.state.todos.filter((todo) => !todo.isComplete);
        this.setState({ todos });
    };

    reset = () => {
        this.setState({
            isOpenTodoForm: false,
            searchTerm: "",
            view: "list",
            filter: "all"
        });
    };

    getView() {
        let todos = this.performSearch();
        todos = this.performFilte(todos);
        return this.state.view === "list" ? (
            <ListView
                todos={todos}
                toggleSelect={this.toggleSelect}
                toggleComplete={this.toggleComplete}
            />
        ) : (
            <TableView
                todos={todos}
                toggleSelect={this.toggleSelect}
                toggleComplete={this.toggleComplete}
            />
        );
    }

    render() {
        const value = this.getView();

        return (
            <div>
                <h1 className="display-4 text-center mb-5"> stack todos </h1>

                <Controller
                    term={this.state.searchTerm}
                    view={this.state.view}
                    changeView={this.changeView}
                    handleSearch={this.handleSearch}
                    toggleForm={this.toggleForm}
                    handleFilter={this.handleFilter}
                    clearSelected={this.clearSelected}
                    clearCompleted={this.clearCompleted}
                    reset={this.reset}
                />

                <div>{value}</div>

                <Modal
                    isOpen={this.state.isOpenTodoForm}
                    toggle={this.toggleForm}
                >
                    <ModalHeader toggle={this.toggleForm}>
                        Create New Todo Item
                    </ModalHeader>
                    <ModalBody>
                        <CreateTodoForm createTodo={this.createTodo} />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default Todos;
