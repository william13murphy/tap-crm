// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.less';

class NavLink extends React.Component {
  props: {
    iconName: string,
    title: string,
    selected?: string,
    to?: string,
  };
  render() {
    return (
      <li className={`NavLink ${this.props.selected ? 'selected' : ''}`}>
        <Link to={this.props.to || '/'}>
          <i
            className={`NavLink__icon NavLink__icon__specific fa fa-${
              this.props.iconName
            }`}
            aria-hidden="true"
          />
          <span className="NavLink__title">{this.props.title}</span>
          <i
            className="NavLink__icon NavLink__icon__dropdown fa fa-caret-down"
            aria-hidden="true"
          />
        </Link>
      </li>
    );
  }
}

export { NavLink as default };
