import React from 'react';
import { Collapse } from '@blueprintjs/core';
import './styles.less';

type CollapsibleProps = {
  title: string,
  children: React.Element<any>,
  className?: string,
  isOpen?: string,
  titleIcon?: string,
};

class Collapsible extends React.Component {
  props: CollapsibleProps;
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
  }
  componentWillMount() {
    if (this.props.isOpen) {
      this.setState({
        isOpen: true,
      });
    }
  }
  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    return (
      <div
        className={`Collapsible ${this.props.className || ''} ${
          this.state.isOpen ? 'isOpen' : 'isClosed'
        }`}
      >
        <h3 onClick={this.handleClick}>
          {this.props.title}
          <span className={`Title__display ${this.props.titleIcon}`} />
        </h3>
        <Collapse isOpen={this.state.isOpen}>{this.props.children}</Collapse>
      </div>
    );
  }
}

export default Collapsible;
