import { Link } from 'react-router';
import PropTypes from 'prop-types';
import React from 'react';

import { api, getApiPromise } from '../helpers/api';
import Button from './button';
import Navbar from './navbar';
import TodoForm from './todo-form';
import TodoLink from './todo-link';
import Todos from './todos';
import SummaryBar from './summaryBar';

import {
  completeAllTasks,
  archiveAllTasks
} from '../helpers/services'
/**
 * TodosPage component
 * @class
 */
class TodosPage extends React.Component {
  /**
   * Base CSS class
   * @static
   */
  static baseCls = 'todos-page'

  /**
   * Prop types
   * @static
   */
  static propTypes = {
    params: PropTypes.object,
  };

  /**
   * Constructor
   * @constructor
   *
   * @param  {object} props - Props
   */
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      filterBy: null,
    };

    this.addTodo = this.addTodo.bind(this);
    this.postTodo = this.postTodo.bind(this);
    this.setFilterBy = this.setFilterBy.bind(this);
    this.updateTodos = this.updateTodos.bind(this);
    this.completeAll = this.completeAll.bind(this);
    this.completeAllTasks = completeAllTasks.bind(this);
    this.archiveAll = this.archiveAll.bind(this);
    this.archiveAllTasks = archiveAllTasks.bind(this);
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    api('GET', null, this.updateTodos);
  }

  /**
   * Add todo
   *
   * @param  {string} text - Todo text
   */
  addTodo(text) {
    if (!text) {
      return;
    }

    api('POST', { text }, this.postTodo);
  }

  /**
   * Posts new todo to the todos collection
   *
   * @param  {object} json - Resulting JSON from fetch
   */
  postTodo(json) {
    this.setState({
      todos: [...json],
    });
  }

  /**
   * Set filterBy state
   *
   * @param {string} filterBy - filterBy state
   */
  setFilterBy(filterBy) {
    this.setState({ filterBy });
  }

  /**
   * Update todos array state
   *
   * @param  {Array} todos - Array of todo objects
   */
  updateTodos(todos) {
    this.setState({ todos });
  }

  completeAll(){
    let updateAllCompleteTask =  this.state.todos.map(todo => {
      todo.status = "complete"

      return todo
    })

    this.setState({todos: updateAllCompleteTask})
  
    this.completeAllTasks(updateAllCompleteTask)
  }


  archiveAll(){
    let updateAllArchiveTask = this.state.todos.map(todo => {
        if(todo.status === "complete"){
          todo.archive = true

          return todo   
                     
        } else if (todo.status === "active"){

          return todo
        }
    })

    this.setState({
      todos: updateAllArchiveTask
    })

    this.archiveAllTasks(updateAllArchiveTask)

    console.log(updateAllArchiveTask)
  }
  /**
   * Render
   * @returns {ReactElement}
   */
  render() {
    return (
      <div className={this.baseCls}>
        <Navbar filterBy={this.state.filterBy} onClickFilter={this.setFilterBy} archiveAll={this.archiveAll} />    
        <SummaryBar onClickCompleteAll={this.completeAll}/>
        <TodoForm onSubmit={this.addTodo} />
        <Todos
          filterBy={this.state.filterBy}
          todos={this.state.todos}
          updateTodos={this.updateTodos}
        />
      </div>
    );
  }
}

export default TodosPage;
