import React from 'react';
import { reduxForm } from 'redux-form';
import InputBlock from 'components/Forms/InputBlock';
import TextField from 'components/Forms/TextField';
import SubmitButton from 'components/Forms/SubmitButton';
import ButtonGroup from 'components/ButtonGroup';
import SelectField from 'components/Forms/SelectField';

import AvatarBlank from 'assets/images/avatar_blank.png';
import './styles.less';

type AuthenticateFormProps = {
  onSubmit: Function,
  handleSubmit: Function,
  dispatchFormPost: Function,
  change: Function,
  token: any,
};

const validate = values => {
  const errors = {};
  if (!values.auth_type) {
    errors.auth_type = 'Please Select Something';
  }
  if (!values.studentId) {
    errors.studentId = 'Please enter Student Id.';
  }
  if (!values.studentName) {
    errors.studentName = 'Please Select Student Name.';
  }
  return errors;
};

class AuthenticateForm extends React.Component {
  props: AuthenticateFormProps;
  constructor() {
    super();
    this.state = {
      form_value: '',
      onScreenKeys: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '-',
        '0',
        '←',
      ],
      screen: 'StudentId',
    };
  }

  onSubmit = formData => {
    let studentBarCode;
    if (this.state.screen === 'StudentName')
      studentBarCode = formData.StudentName.split(' ')[0];
    else studentBarCode = formData.StudentId;

    let data = {
      SchoolId: this.props.token.payload.SchoolId,
      StudentCode: studentBarCode,
      AuthenticationType: 3,
    };
    this.props.dispatchFormPost(data);
  };

  virtualKeyboard = e => {
    let val = e.currentTarget.getAttribute('data-value');
    let value = this.state.form_value;
    let newval = '';
    if (val == '←') {
      newval = value.substring(0, value.length - 1);
      this.setState({
        form_value: value.substring(0, value.length - 1),
      });
    } else {
      newval = value + val;
      this.setState({
        form_value: value + val,
      });
    }
    this.props.change('StudentId', newval);
  };

  onPressButtonField = screen => {
    this.setState({ screen });
  };

  render() {
    return (
      <div className="KioskStudentForm">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} method="POST">
          <ButtonGroup
            active={this.state.screen}
            data={[
              {
                key: 'StudentId',
                name: 'Student ID',
              },
              {
                key: 'StudentName',
                name: 'Student Name',
              },
            ]}
            onClick={this.onPressButtonField}
          />

          <InputBlock>
            {this.state.screen === 'StudentId' ? (
              <TextField
                type="text"
                placeholder="Student Id"
                name="StudentId"
                autoFocus={true}
                required={true}
                onChange={(e, newValue) => {
                  this.setState({
                    form_value: newValue,
                  });
                }}
                value={this.state.form_value}
              />
            ) : (
              <SelectField
                placeholder="Tap To Type Your Name"
                required={true}
                name="StudentName"
                options={
                  this.props.kioskStudents &&
                  this.props.kioskStudents.payload &&
                  this.props.kioskStudents.payload.map(item => {
                    return {
                      label: (
                        <div className="KioskStudent">
                          <img
                            className="KioskStudentImage"
                            src={(item && item.PictureBlobUrl) || AvatarBlank}
                          />
                          <span className="StudentName">{`${
                            item.FirstName
                          } ${' '} ${item.LastName}`}</span>
                        </div>
                      ),
                      value:
                        item.BarCode +
                        ' ' +
                        item.FirstName +
                        ' ' +
                        item.LastName,
                    };
                  })
                }
              />
            )}
          </InputBlock>
          <div className="error-msg" />
          <SubmitButton className="fancy" intent="pt-intent-primary">
            Check In
          </SubmitButton>
        </form>
        <div className="OnscreenKeyboard">
          <div className="row">
            {this.state.onScreenKeys.map((val, index) => {
              return (
                <div className="col-xs-4" key={index}>
                  {val === '' ? (
                    ''
                  ) : (
                    <button
                      className="pt-button kbd-btn"
                      data-value={val}
                      onClick={this.virtualKeyboard}
                    >
                      {val}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'kiosk', // a unique identifier for this form
  validate,
})(AuthenticateForm);
