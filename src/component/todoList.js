import "../CSS/todoList.css"
import React, { Component } from 'react';

export default class TodoList extends Component {
    constructor(props){
        super(props);
        this.state={
            todos: [],
            statusOfList: 'all'
        };
    }

    addItem=()=>{
        let toAdd = this.refs.todoInput.value;
        let todos = this.state.todos;
        todos.push({id:this.generateUUID(),name:toAdd,complete:false});
        this.setState(todos);
    }
    checkItem=(viewId,event)=>{
        this.state.todos.find(item => item.id === viewId).complete=event.target.checked;
        this.setState({todos:this.state.todos});
        // this.state.todos.find(item=>item.id === viewId).complete=event.target.checked;
        // this.setState({todos:this.state.todos});
    }
    edit = (event) => {
        event.target.setAttribute('contentEditable', 'true');
        event.target.focus();
    };
    setStatusofListByStatus = status => {
        this.setState({ statusOfList: status });
    };
    filterByStatus = (todos, status) => {
        const filterExecuter = {
            all() {
                return true;
            },
            active(element) {
                return !element.complete;
            },
            complete(element) {
                return element.complete;
            }
        };
        const result = todos.filter(filterExecuter[status]);
        return result;
    };
    generateUUID=()=> {
        /*jshint bitwise:false */
        var i,
            random;
        var uuid = '';

        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                uuid += '-';
            }
            uuid += (i === 12
                ? 4
                : (i === 16
                    ? (random & 3 | 8)
                    : random)).toString(16);
        }
        return uuid;
    }
    toview=(todo)=>{
        return <li id={todo.id} onClick={this.edit}  className={todo.complete?'checked':'' }>
            <input name="done-todo" onChange={(e)=>this.checkItem(todo.id,e)} type="checkbox" className="done-todo"/>
            {todo.name}</li>}


render(){
    return(
        <div className="container">
            <h1>TodoList</h1>
            <div>
                <input ref="todoInput" className="input-text" type="text" name="ListItem"/>
                <div id="button" onClick={this.addItem}>Add</div>
            </div>
            <br/>
            <ol>
                {this.filterByStatus(this.state.todos, this.state.statusOfList).map((todo)=>this.toview(todo))}

            </ol>
                <ul id="filters">
                    <li>
                        <a
                            href="#"
                            data-filter="all"
                            onClick={() => this.setStatusofListByStatus('all')}
                            className="selected"
                        >
                            ALL
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            data-filter="active"
                            onClick={() => this.setStatusofListByStatus('active')}
                            className=""
                        >
                            Active
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            data-filter="complete"
                            onClick={() => this.setStatusofListByStatus('complete')}
                            className=""
                        >
                            Complete
                        </a>
                    </li>
                </ul>
            </div>
        )
    }

}