import React from 'react';
import { Link } from 'react-router-dom';
import './styles.less';

type TodoCardProps = {
  status?: 'warning' | 'danger' | 'success',
  title?: string,
  className?: string,
  deleteLink?: string,
  editLink?: string,
  children: React.Element<any>,
  style: {},
};

class TodoCard extends React.Component {
  props: TodoCardProps;
  componentWillMount() {}
  renderStatusIcon() {
    if (!this.props.status) {
      return null;
    } else {
      if (this.props.status === 'success') {
        return (
          <span className="TodoCard__status-icon pt-icon pt-icon-tick-circle" />
        );
      } else if (this.props.status === 'warning') {
        return (
          <span className="TodoCard__status-icon pt-icon pt-icon-notifications" />
        );
      }
      if (this.props.status === 'danger') {
        return (
          <span className="TodoCard__status-icon pt-icon pt-icon-warning-sign" />
        );
      }
    }
  }
  getStatusClassName() {
    if (!this.props.status) {
      return null;
    } else {
      return 'status--' + this.props.status;
    }
  }
  render() {
    return (
      <div
        style={this.props.style || {}}
        className={`${this.props.className ||
          ''} TodoCard pt-elevation-1 ${this.getStatusClassName()}`}
      >
        <div className="TodoCard__header">
          {this.renderStatusIcon()}

          {this.props.title && (
            <h3 className="TodoCard__title">{this.props.title || ''}</h3>
          )}
        </div>
        <div className="TodoCard__body">{this.props.children}</div>
      </div>
    );
  }
}

export default TodoCard;
