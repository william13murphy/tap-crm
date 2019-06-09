import { getUnverifiedStudents, postVerifyStudent } from 'api';
import Spinner from 'components/DataLoading/Spinner';
import Toast from 'components/Toast';
import React from 'react';
import connect from 'src/redux/connect';
import PlanDetailSummary from '../../Students/Plans/PlanDetail/PlanDetailSummary';
import './styles.less';

class ValidateScannedDoc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      currentIndex: 0,
    };
  }

  componentDidMount() {
    getUnverifiedStudents(this.props.match.params.schoolId)
      .done(data => {
        this.setState({
          data,
          loading: false,
        });
      })
      .fail(error => {
        console.error('Unable to fetch unverified students', error);
      });
  }

  skipNext = () => {
    const [first, ...restData] = this.state.data;
    this.setState({
      data: [...restData, first],
    });
  };

  verifyStudent = studentId => {
    postVerifyStudent(studentId)
      .done(resp => {
        Toast.showSuccess('Student is verified!');
        this.setState({
          data: this.state.data.filter(d => d.Id !== studentId),
        });
      })
      .fail(error => {
        Toast.showError('Student verification failed!');
      });
  };

  render() {
    if (this.state.loading) {
      return <Spinner />;
    }

    if (!this.state.data.length) {
      return (
        <div
          style={{
            margin: '20px',
            display: 'flex',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h3>All caught up! All students are verified.</h3>
        </div>
      );
    }

    const currentRecord = { ...this.state.data[0] };
    let attachmentUrl = 'https://i.ibb.co/GtQmrDM/attachment-Not-Found.jpg';
    if (
      currentRecord.PaymentDetail &&
      currentRecord.PaymentDetail[0] &&
      currentRecord.PaymentDetail[0].AttachmentUrl
    ) {
      attachmentUrl = currentRecord.PaymentDetail[0].AttachmentUrl;
    }

    return (
      <div className="ValiadteScannedDoc">
        <div className="ActionButtons">
          <button
            onClick={this.verifyStudent.bind(this, currentRecord.Id)}
            className="pt-button pt-intent-primary pt-icon-tick pt-icon-primary"
          >
            Validate
          </button>
          <button onClick={this.skipNext} className="pt-button">
            Skip to Next
          </button>
        </div>
        <p style={{ textAlign: 'center', fontSize: '12px', color: 'gray' }}>{`${
          this.state.data.length
        } awaiting validation`}</p>
        <div className="Main" key={currentRecord.Id}>
          <div className="Form" style={{ margin: '8px' }}>
            {this.renderFormDetails(currentRecord)}
          </div>
          <div className="Img" style={{ margin: '8px' }}>
            <img className="ProfileCard__picture" src={attachmentUrl} />
          </div>
        </div>
      </div>
    );
  }

  renderFormDetails = data => {
    return (
      <PlanDetailSummary planId={data.PlanId} studentId={data.StudentId} />
    );
  };
}

const mapStateToProps = state => {
  return {
    references: state.utility.references,
  };
};

export default connect(
  ValidateScannedDoc,
  mapStateToProps
);
