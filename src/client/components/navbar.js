import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import Button from './button';
import Todos from './todos';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filterBy: PropTypes.string,
  onClickFilter: PropTypes.func,
  archiveAll: PropTypes.func,
  status: PropTypes.string,
  text: PropTypes.string,
  archive: PropTypes.bool
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filterBy: '',
  onClickFilter: noop,
  archiveAll:noop,
  status:'',
  text: '',
  archive: false
};


/**
 * Navbar component
 * @returns {ReactElement}
 */
const Navbar = ({ filterBy, onClickFilter, archiveAll}) => {
  /**
   * Base CSS class
   */
  const baseCls = 'navbar'

  let allLinkCls = `${baseCls}__item`;
  allLinkCls += filterBy === 'all' ? ` ${baseCls}__item--active` : '';

  let activeLinkCls = `${baseCls}__item`;
  activeLinkCls += filterBy === 'active' ? ` ${baseCls}__item--active` : '';

  let completedLinkCls = `${baseCls}__item`;
  completedLinkCls += filterBy === 'completed' ? ` ${baseCls}__item--active` : '';

  let archivedLinkCls = `${baseCls}__item`;
  archivedLinkCls += filterBy === 'archived' ? ` ${baseCls}__item--active` : '';
  
  return (
    <div className={baseCls}>
      <div>
        <NavLink
          to="/all"
          activeClassName={`${baseCls}__item--active`}
          className={allLinkCls}
          onClick={() => onClickFilter('all')}
        >
          All
        </NavLink>
        <NavLink
          to= "/active"
          activeClassName={`${baseCls}__item--active`}
          className={activeLinkCls}
          onClick={() => onClickFilter('active')}
        >
          Active
        </NavLink>
        <NavLink
          to = "/completed"
          activeClassName={`${baseCls}__item--active`}
          className={completedLinkCls}
          onClick={() => onClickFilter('completed')}
        >
          Completed
        </NavLink>
        <NavLink
          to= "/archived"
          activeClassName={`${baseCls}__item--active`}
          className={archivedLinkCls}
          onClick={() => onClickFilter('archived')}
        >
          Archived
        </NavLink>
      </div>
      <div>
        <Button 
          className = "button"
          text = "Archive all completed"   
          onClick = {archiveAll}
        />
      </div>
    </div>
  );
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
