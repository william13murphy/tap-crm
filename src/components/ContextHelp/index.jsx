import React from 'react';
import './styles.less';
import {
  Popover,
  PopoverInteractionKind,
  Position,
  Icon,
} from '@blueprintjs/core';

import tempHelpMessages from 'src/redux/data/helpMessages';

type ContextHelpProps = {
  id: string,
};

class ContextHelp extends React.Component {
  props: ContextHelpProps;

  constructor() {
    super();
    this.state = {
      message: '',
    };
  }

  componentDidMount() {
    let item = tempHelpMessages.find(item => item.id === this.props.id);
    if (item) {
      this.setState({
        message: item.message,
      });
    }
  }

  render() {
    return (
      <div onClick={e => e.preventDefault()} className="ContextHelp">
        <Popover
          defaultIsOpen={false}
          position={Position.BOTTOM_LEFT}
          inline={true}
          interactionKind={PopoverInteractionKind.CLICK}
        >
          <div
            className="Icon pt-icon-help"
            style={{
              display: this.state.message === '' ? 'none' : null,
            }}
          />
          <div className="ContextHelp__message">
            <p>{this.state.message}</p>
          </div>
        </Popover>
      </div>
    );
  }
}

export default ContextHelp;
