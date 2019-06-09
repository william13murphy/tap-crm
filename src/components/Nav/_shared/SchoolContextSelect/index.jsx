import React from 'react';
import SelectMockInput from 'components/Forms/SelectMockInput';
import connect from 'src/redux/connect';
import './styles.less';
import {
  appContextGetSchoolId,
  appContextSetSchoolId,
} from 'src/redux/actionCreators/appContext';
import { replaceSchoolIdInUrl } from 'util/router';

type SchoolContextSelectProps = {
  readOnly: boolean, // if true, returns a div. If false, returns a Select field.
  schools: Array<{}>,
  appContext: { schoolId: string },
  dispatchAppContextGetSchoolId: Function,
  dispatchAppContextSetSchoolId: Function,
};

class SchoolContextSelect extends React.Component {
  props: SchoolContextSelectProps;
  handleSelectChange = e => {
    // Set the SchoolId
    if (e) {
      this.props.dispatchAppContextSetSchoolId(e.value);
      // Must redirect to root, to prevent access to parts which do not belong to selected school:
      const newUrl = `/app/school-app/${e.value}/dashboard`;
      if (newUrl) {
        this.props.history.push(newUrl);
      }
    }
  };

  render() {
    if (this.props.readOnly) {
      return (
        <div className="SchoolContextSelect SchoolContextSelect--read-only">
          {this.props.schools
            .filter((school, i) => {
              return school.Id === this.props.appContext.schoolId;
            })
            .map((school, i) => (
              <div key={i}>{school.Name}</div>
            ))}
        </div>
      );
    } else {
      if (this.props.schools.length > 0) {
        return (
          <div className="SchoolContextSelect">
            <SelectMockInput
              className="SchoolContextSelect__input"
              options={this.props.schools.map((school, i) => {
                return { label: school.Name, value: school.Id };
              })}
              value={this.props.appContext.schoolId}
              onChange={this.handleSelectChange}
              initialValue={this.props.appContext.schoolId}
            />
          </div>
        );
      } else {
        return null;
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    appContext: state.appContext,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchAppContextGetSchoolId: defaultId => {
      dispatch(appContextGetSchoolId(defaultId));
    },
    dispatchAppContextSetSchoolId: id => {
      dispatch(appContextSetSchoolId(id));
    },
  };
};

export default connect(
  SchoolContextSelect,
  mapStateToProps,
  mapDispatchToProps
);
