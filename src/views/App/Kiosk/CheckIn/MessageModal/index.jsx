import React from 'react';
import connect from 'src/redux/connect';
import Modal from 'components/Modal';
import styleVariables from 'styles/_variables';
import './styles.less';

type MessageModalProps = {
  history: {
    push: Function,
  },
  location: {},
  match: {},
  messages: [],
};

class MessageModal extends React.Component {
  props: MessageModalProps;

  constructor() {
    super();
    this.state = {
      showCheckinMessage: true,
    };
  }

  render() {
    return (
      this.state.showCheckinMessage &&
      this.props.messages.length > 0 && (
        <Modal
          title="Message"
          handleCloseClick={() => {
            this.setState({
              showCheckinMessage: false,
            });
          }}
        >
          <div>
            {this.props.messages &&
              this.props.messages.map((item, index) => {
                let messageColor =
                  item.MessageType == 1
                    ? 'pt-callout pt-intent-danger pt-icon-warning-sign'
                    : item.MessageType == 2
                      ? 'pt-callout pt-intent-success pt-icon-star'
                      : item.MessageType == 3
                        ? 'pt-callout pt-intent-primary pt-icon-timeline-events'
                        : '';

                return (
                  <div className="KioskMessage" key={index}>
                    <span className={messageColor}>
                      <h4>{item.Message}</h4>
                    </span>
                  </div>
                );
                this.setState({ showCheckinMessage: false });
              })}
          </div>
        </Modal>
      )
    );
  }
}
export default connect(MessageModal);
