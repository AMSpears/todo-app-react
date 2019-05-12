import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filterBy: PropTypes.string,
  onClickFilter: PropTypes.func,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filterBy: '',
  onClickFilter: noop,
};

/**
 * Navbar component
 * @returns {ReactElement}
 */
const Navbar = ({ filterBy, onClickFilter }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'navbar'

  let activeLinkCls = `${baseCls}__item`;
  activeLinkCls += filterBy === 'active' ? ` ${baseCls}__item--active` : '';

  let completedLinkCls = `${baseCls}__item`;
  completedLinkCls += filterBy === 'completed' ? ` ${baseCls}__item--active` : '';

  let archivedLinkCls = `${baseCls}__item`;
  archivedLinkCls += filterBy === 'archived' ? ` ${baseCls}__item--active` : '';

  return (
    <div className={baseCls}>
      <NavLink
        to="/"
        activeClassName={`${baseCls}__item--active`}
        className={`${baseCls}__item`}
        onClick={() => onClickFilter('')}
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
  );
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
