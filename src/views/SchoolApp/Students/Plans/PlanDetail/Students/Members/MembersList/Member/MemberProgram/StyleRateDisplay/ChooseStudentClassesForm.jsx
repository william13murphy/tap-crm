import React from 'react';
import { reduxForm } from 'redux-form';
import connect from 'src/redux/connect';

import InputBlock from 'components/Forms/InputBlock';
import SubmitButton from 'components/Forms/SubmitButton';
import ReferenceOutput from 'components/ConnectedComponents/ReferenceOutput';
import SwitchField from 'components/Forms/SwitchField';
import ClassDisplay from './ClassDisplay';
import { getTimeZoneLabel } from 'src/util/localization/timezone';

type ChooseStudentClassesFormProps = {
  studentId: string,
  schoolStyleId: string,
  studentPackageStyleRankId: string,
  schoolStyleClassesMany: {
    payload: {},
  },
  dispatchFormPost: any,
  handleSubmit: any,
  pristine: any,
  reset: any,
  submitting: any,
  timeZone: string,
  token: {
    payload: {
      UserId: string,
    },
  },
};

const validate = values => {
  return {};
};

class ChooseStudentClassesForm extends React.Component {
  props: ChooseStudentClassesFormProps;
  state = {
    selectAll: false,
    selectDeselectall: 'Select All',
    selectArray: this.props.schoolStyleClasses.map(item => {
      return { checked: false, ...item };
    }),
  };

  selectDeselect() {
    this.state.selectDeselectall === 'Select All'
      ? this.setState({ selectDeselectall: 'Deselect All' })
      : this.setState({ selectDeselectall: 'Select All' });
    if (!this.state.selectAll) {
      this.setState({
        selectAll: true,
        selectArray: this.props.schoolStyleClasses.map(item => {
          return { checked: true, ...item };
        }),
      });
    } else {
      this.setState({
        selectAll: false,
        selectArray: this.props.schoolStyleClasses.map(item => {
          return { checked: false, ...item };
        }),
      });
    }
  }
  onSubmit = formData => {
    const chosenClassInputNames = this.state.selectArray.filter((cV, i) => {
      if (cV.checked) {
        return true;
      }
    });

    if (chosenClassInputNames.length === this.props.schoolStyleClasses.length) {
      formData.AuthorizedForAllStyleRankClass = true;
      delete formData.SchoolClassIds; // Just in case it is still on the formData
    } else {
      const chosenClassIds = chosenClassInputNames.map((cV, i) => {
        return cV.Id;
      });
      formData.SchoolClassId = chosenClassIds;
      formData.AuthorizedForAllStyleRankClass = false; // Must send this as false, required field.
    }

    // Remove individual classes from formdata,
    // in favor of AuthorizedForAllStyleRankClass or chosenClassIds array:
    this.state.selectArray.forEach(cV => {
      delete formData[`ClassId__${cV.Id}`];
    });
    formData.CreatedBy = this.props.token.payload.UserId;
    formData.PlanStudentStyleRateId = this.props.planStudentStyleRateId;

    this.props.dispatchFormPost(formData);
  };

  componentWillMount() {
    this.setSchoolTimeZone();
  }

  setSchoolTimeZone() {
    let schoolTimeZone = getTimeZoneLabel(
      this.props.references,
      this.props.schoolProfile.payload.TimeZoneId
    );

    this.setState({
      schoolTimeZone,
    });
  }

  render() {
    return (
      <div className="ChooseStudentClassesForm__wrapper">
        <div>
          <strong>Maximum Classes per Week: </strong>
          <span>{this.props.totalClasses}</span>
        </div>
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          method="POST"
          className="ChooseStudentClassesForm"
        >
          <div className="ChooseClassesButtonWrapper">
            <button
              type="button"
              className="pt-button pt-intent-primary"
              onClick={this.selectDeselect.bind(this)}
            >
              {this.state.selectDeselectall}
            </button>
            <SubmitButton intent="pt-intent-primary float-right">
              Submit
            </SubmitButton>
          </div>
          <div>
            <table className="SchoolStyleClass default-table-striped">
              <tbody>
                {this.props.schoolStyleClasses.map((cV, i) => {
                  return (
                    <tr key={i}>
                      <td>
                        <SwitchField
                          name={`ClassId__${cV.Id}`}
                          label=""
                          checked={this.state.selectArray[i].checked}
                          onClick={() => {
                            let { selectArray } = this.state;
                            selectArray[i].checked = !selectArray[i].checked;
                            this.setState({
                              selectArray,
                            });
                          }}
                        />
                      </td>
                      <td>
                        <ClassDisplay
                          inline
                          timeZone={this.state.schoolTimeZone}
                          classDetail={cV}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    schoolProfile: state.school.profile,
    references: state.utility.references,
    token: state.token,
  };
};

const connectedChooseStudentClassesForm = connect(
  ChooseStudentClassesForm,
  mapStateToProps
);

export default reduxForm({
  form: 'choose-student-classes', // a unique identifier for this form
  validate,
})(connectedChooseStudentClassesForm);
