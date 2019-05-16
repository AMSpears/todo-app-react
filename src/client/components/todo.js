import PropTypes from 'prop-types';
import React from 'react';

import Button from './button';
import TodoLink from './todo-link';


const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filtered: PropTypes.bool,
  onClickDelete: PropTypes.func,
  onClickTodo: PropTypes.func,
  onClickArchive: PropTypes.func,
  status: PropTypes.string,
  archive: PropTypes.bool,
  text: PropTypes.string,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filtered: false,
  onClickDelete: noop,
  onClickTodo: noop,
  onClickArchive: noop,
  status: '',
  text: '',
  archive: false,
};

/**
 * Todo component
 * @returns {ReactElement}
 */
const Todo = ({ filtered, onClickDelete, onClickTodo, onClickArchive, status, archive, text }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'todo';

  const todoCls = baseCls
    +(status === 'complete' ? ' todo--status-complete' : '')
    +(archive === true ? 'todo--status-archive' : '')
    + (filtered ? ' todo--filtered' : '');
    
  return (
    <div className={todoCls}>
      <div className = "items-container">
        <div className = "items" onClick={onClickTodo}>
          <div className= 'box'></div>
          <TodoLink text={text}/>
        </div>
        <div className = "items" onClick = {onClickArchive}>
          <div className = "archiveBtn">Archive</div>
        </div>
      </div>
      <div className= "items-container"> 
        <Button text='X' onClick={onClickDelete} />
      </div>
    </div>
  );
}

Todo.propTypes = propTypes;
Todo.defaultProps = defaultProps;

export default Todo;
