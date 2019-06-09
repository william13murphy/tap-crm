import React from 'react';
import connect from 'src/redux/connect';
import './styles.less';



class AttachPlanDoc extends React.Component {

    constructor(props) {
        super(props);
        this.fileSelector =  document.createElement('input');
        this.fileSelector.setAttribute('type', 'file');
        this.fileSelector.setAttribute('multiple', 'multiple');
        this.fileSelector.setAttribute('accept', '.png, .jpg, .JPEG');
        this.fileSelector.onchange = this.handleFileSelect;
        this.state = {
            selectedFile: ''
        }

    }

    componentDidMount() {
        this.launchFilePicker()
    }

    launchFilePicker = () => {
        this.fileSelector.click(); 
    }

    handleCancel = () => {
        const schoolId = this.props.match.params.schoolId;
        const studentId = this.props.match.params.studentId;
        this.props.history.push(`/app/school-app/${schoolId}/students/detail/${studentId}/plans`);
    }

    handleFileSelect = (e) => {

        this.setState({
            selectedFile: URL.createObjectURL(e.target.files[0])
        })

    }

  render() {
    const schoolId = this.props.match.params.schoolId;
    const studentId = this.props.match.params.studentId;

    return (
        <div className='AttachPlanDoc'>
            <div className='actionButtons' style={{margin: '0 auto', width: '100%'}}>
                <button className='pt-button pt-intent-primary pt-icon-saved'>Upload</button>
                <button onClick={this.launchFilePicker} className='pt-button pt-icon-undo'>Pick Another</button>
            </div>            
            <div className="preview" style={{margin: '8px'}}>
                <img src={this.state.selectedFile} />
            </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    studentPlanEnrollment: state.student.planEnrollment,
  };
};

export default connect(
  AttachPlanDoc,
  mapStateToProps
);
