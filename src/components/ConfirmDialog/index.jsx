import React from 'react';

import SubmitButton from 'components/Forms/SubmitButton';
import InputBlock from 'components/Forms/InputBlock';
import Modal from 'components/Modal';
import { Link } from 'react-router-dom';
import './styles.less';

type ConfirmDialogProps = {
  dispatchFormPost: any,
  id: string,
  title: string,
  closeUrl: string,
};

class ConfirmDialog extends React.Component {
  props: ConfirmDialogProps;

  render() {
    return (
      <div className="ConfirmDialog">
        <h4>{this.props.title}</h4>
        <div className="ButtonContainer">
          <button
            onClick={() => {
              this.props.dispatchFormPost(this.props.id);
            }}
            className="pt-button pt-intent-primary ConfirmDialog__button"
          >
            Yes
          </button>
          <Link to={this.props.closeUrl}>
            <button className="pt-button ConfirmDialog__button">No</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default ConfirmDialog;
