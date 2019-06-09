import React from 'react';
import './styles.less';

type SpinnerProps = {
  message?: string,
  small?: boolean,
};

// const SpinnerMessage = (props: {message?: string}) => {
//   if (props.message) {
//     return <div className="Spinner__message">{props.message}</div>;
//   } else {
//     return null;
//   }
// };

class Spinner extends React.Component {
  props: SpinnerProps;
  render() {
    return (
      <div className="Spinner">
        <div
          className={`Spinner__image__container ${
            this.props.message ? 'message' : ''
          }`}
        >
          <img
            className="Spinner__image"
            src="/assets/images/Tail_darkgray.svg"
            height={this.props.small ? 75 : 150}
            width={this.props.small ? 75 : 150}
          />
        </div>
        {/*<SpinnerMessage message={props.message} />*/}
      </div>
    );
  }
}

export default Spinner;
