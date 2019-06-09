import React from 'react';
import PercentBar from 'components/PercentBar';
import ProgressBar from 'components/ProgressBar';
import moment from 'moment';
import connect from 'src/redux/connect';
import { createStudent } from 'api';
import { postStudentCSV } from 'api';
import Papa from 'papaparse';
import Spinner from 'components/DataLoading/Spinner';
import LoadingPlaceholder from 'components/DataLoading/LoadingPlaceholder';
import SubmitButton from 'components/Forms/SubmitButton';
import { downloadCSV } from 'src/util/downloadCSV';

import './styles.less';

const csv = require('csvtojson');

type ImportStudentProps = {
  token: {
    payload: {
      UserId: string,
    },
  },
  schoolProfile: {
    payload: {
      CountryId: string,
      Id: string,
    },
  },
};

class ImportStudents extends React.Component {
  constructor(props: ImportStudentProps) {
    super(props);
    this.state = {
      studentData: [],
      studentImportSuccessCount: [],
      studentImportFailureCount: [],
      displayProgressBar: false,
      totalImportStudentRequest: 0,
      isDisabled: true,
    };
  }

  formatStudentData = student => {
    let dob = student['Date Of Birth(mm-dd-yyyy)'];

    student['FirstName'] = student['*First Name'];
    student['LastName'] = student['*Last Name'];
    student['City'] = student['*City'];
    student['AddressLine1'] = student['*Address Line1'];
    student['State'] = student['*State'];
    student['Zip'] = student['*Zip'];
    student['SchoolId'] = this.props.schoolProfile.payload.Id;
    student['DateOfBirth'] = moment(dob).format('YYYY-MM-DDTHH:mm:ssZ');
    student['Style'] = student['Program'];
    student['AddressLine2'] = 'Lake Avenue';
    student['Contact1FirstName'] = student['Contact1 First Name'];
    student['Contact1LastName'] = student['Contact1 Last Name'];
    student['Contact1Relationship'] =
      student['Contact1 Relationship(Father, Mother, etc)'];
    student['Contact1Phone'] = student['Contact1 Phone'];
    student['Contact1Email'] = student['Contact1 Email'];
    student['Contact2FirstName'] = student['Contact2 First Name'];
    student['Contact2LastName'] = student['Contact2 Last Name'];
    student['Contact2Relationship'] =
      student['Contact2 Relationship(Father, Mother, etc)'];
    student['Contact2Phone'] = student['Contact2 Phone'];
    student['Contact2Email'] = student['Contact2 Email'];
    student['UserTypeId'] = '5ebf5cca-df92-49c6-ae5f-f3c9670bf9d3';
    student['CountryId'] = this.props.schoolProfile.payload.CountryId;
    student['StatusTypeId'] = 'f74a4642-46f3-49ac-9802-f5b082e79407';
    student['CreatedOn'] = moment().format('YYYY-MM-DD');
    student['CreatedBy'] = '88237092-ed98-4da9-98e6-2de1d10e0fd0';

    delete student['*Country'];
    delete student['*First Name'];
    delete student['*Last Name'];
    delete student['*City'];
    delete student['*State'];
    delete student['*Zip'];
    delete student['*Country'];
    delete student['Date Of Birth(mm-dd-yyyy)'];
    delete student['*Address Line1'];

    delete student['Contact1 First Name'];
    delete student['Contact1 Last Name'];
    delete student['Contact1 Relationship(Father, Mother, etc)'];
    delete student['Contact1 Phone'];
    delete student['Contact1 Email'];
    delete student['Contact2 First Name'];
    delete student['Contact2 Last Name'];
    delete student['Contact2 Relationship(Father, Mother, etc)'];
    delete student['Contact2 Phone'];
    delete student['Contact2 Email'];

    delete student['Program'];

    return student;
  };

  calculatedAgeFromDob = studentDob => {
    let Age = moment(moment().startOf('day')).diff(studentDob, 'years');
    return Age;
  };

  handleImportStudent = studentData => {
    studentData.pop();
    studentData.forEach((student, index) => {
      const updatedStudentData = this.formatStudentData(student);
      const returnedPromise = postStudentCSV(updatedStudentData);
      this.displayProgress();
      returnedPromise
        .done(data => {
          this.handleSuccess(student, index);
        })
        .fail(error => {
          this.handleFailure(student, index);
        })
        .always(() => {
          this.handleAlways(student, index);
        });
    });
  };

  handleSuccess = (student, index) => {
    this.setState({
      studentImportSuccessCount: this.state.studentImportSuccessCount.concat({
        ...student,
      }),
    });
  };

  handleFailure = (student, index) => {
    this.setState({
      studentImportFailureCount: this.state.studentImportFailureCount.concat({
        ...student,
      }),
    });
  };

  handleAlways = () => {
    this.setState({
      totalImportStudentRequest: this.state.totalImportStudentRequest + 1,
    });
  };

  displayProgress = () => {
    this.setState({
      displayProgressBar: true,
    });
  };

  handleJSONData = data => {
    this.setState({
      studentData: data,
      isDisabled: false,
    });
  };

  handleCSVImport = (csvFilePath, handleJSONData) => {
    let results;
    Papa.parse(csvFilePath, {
      header: true,
      complete: function(results) {
        handleJSONData(results.data);
      },
    });
  };

  downloadFailedStudent = data => {
    downloadCSV(data);
  };

  render() {
    // This is to remove the empty student object.
    let studentCount = this.state.studentData.length - 1;

    let studentRatio = Math.ceil(100 / studentCount);

    let isAllStudentsFailed =
      this.state.studentData.length ===
      this.state.studentImportFailureCount.length
        ? true
        : false;

    return (
      <div className="ImportStudent__container">
        <div className="ImportStudent__Choosefile">
          <div className="ImportStudent__title">
            Import Student Data{' '}
            <span className="ImportStudent__filetype">
              (Allowed Filetype: CSV)
            </span>
          </div>
          <input
            type="file"
            id="file"
            accept=".csv"
            onChange={e =>
              this.handleCSVImport(e.target.files[0], this.handleJSONData)
            }
          />
          {this.state.displayProgressBar && (
            <div className="Import__progressbar">
              {!isAllStudentsFailed && (
                <ProgressBar
                  percent={
                    this.state.studentImportSuccessCount.length > 0
                      ? this.state.studentImportSuccessCount.length *
                        studentRatio
                      : 100
                  }
                  backgroundColor={
                    this.state.studentImportSuccessCount.length > 0
                      ? null
                      : 'lightgreen'
                  }
                  label={
                    this.state.studentImportSuccessCount.length > 0
                      ? null
                      : 'Import in Progress'
                  }
                />
              )}
              {this.state.totalImportStudentRequest ===
                this.state.studentData.length && (
                <div className="ImportStatus__count">
                  {this.state.studentImportSuccessCount.length > 0 && (
                    <div className="ImportStatus__item Success">{`${
                      this.state.studentImportSuccessCount.length
                    } students added successfully !`}</div>
                  )}
                  {this.state.studentImportFailureCount.length > 0 && (
                    <div className="ImportStatus__item fail">
                      {`Import failed for ${
                        this.state.studentImportFailureCount.length
                      } students`}
                      <span className="DownloadFailedList">
                        <a
                          onClick={() => {
                            this.downloadFailedStudent(
                              this.state.studentImportFailureCount
                            );
                          }}
                        >
                          Download list
                        </a>
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <SubmitButton
          className="Import__student"
          disabled={this.state.isDisabled}
          children="Upload"
        >
          <div
            onClick={() => {
              this.handleImportStudent(this.state.studentData);
            }}
          >
            Import
          </div>
        </SubmitButton>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    references: state.utility.references,
    schoolProfile: state.school.profile,
  };
};

export default connect(
  ImportStudents,
  mapStateToProps
);
