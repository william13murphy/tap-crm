import React from 'react';
import { Link } from 'react-router-dom';
import './styles.less';

// Pass in a closeUrl to navigate to, or
// Pass in a handleCloseClick function to call.

class Modal extends React.Component {
  props: {
    title: string,
    closeUrl?: string,
    handleCloseClick?: Function,
    children: any,
    className?: string,
    overflowVisible: string, // Allow Select-menu-outer to overflow outside of modal. Use sparingly in short modals only, because it will prevent the modal from scrolling on small screens.
  };
  render() {
    const overflow = this.props.overflowVisible ? 'overflow-visible' : '';
    return (
      <div className={`Modal ${this.props.className || ''} ${overflow}`}>
        <div className="Modal__window">
          <div className="Modal__window__header">
            <h3>{this.props.title}</h3>
            {this.props.closeUrl && (
              <Link
                to={this.props.closeUrl}
                className="Modal__close pt-icon-large pt-icon-cross"
              />
            )}
            {this.props.handleCloseClick && (
              <span
                onClick={this.props.handleCloseClick}
                className="Modal__close pt-icon-large pt-icon-cross"
              />
            )}
          </div>
          <div className="Modal__window__content">{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default Modal;
