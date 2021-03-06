import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { withRouter } from "react-router-dom";

const Todo = props => (
    <tr>
        <td className={props.todo.complete ? 'completed' : ''}>{props.todo.title}</td>
        <td className={props.todo.complete ? 'completed' : ''}>{props.todo.responsible}</td>
        <td>
            <Link to={"/dashboard/edit/"+props.todo._id}>Edit</Link>
        </td>
    </tr>
)

 class TodosList extends Component {

    constructor(props) {
        super(props);
        this.state = {todos: []};
    }

    componentDidMount() {
        axios.get("/api/todo/todos")
            .then(response => {
                this.setState({ todos: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    todoList() {
        return this.state.todos.map(function(currentTodo, i){
            return <Todo todo={currentTodo} key={i} />;
        })
    }

    render() {
        let {data}=this.state
        return (
            <div>
                <h4 style={{textAlign:"center"}}>Todo List</h4>
        
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}
export default withRouter (TodosList)