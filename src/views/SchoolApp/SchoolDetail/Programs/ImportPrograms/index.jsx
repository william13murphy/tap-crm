import React from 'react';
import connect from 'src/redux/connect';

import * as fileStack from 'filestack-js';

import './styles.less';

type ImportProgamsProps = {
  schoolProfile: {
    payload: [{}],
  },
  dispatchFormPost: any,
  schoolId: any,
};
class ImportPrograms extends React.Component {
  constructor(props: ImportProgamsProps) {
    super(props);
    this.state = {
      apiKey: 'Ad2vROFRcRm5WLTCBktFfz',
    };
  }

  handleFileUpload = () => {
    const filePicker = fileStack.init(this.state.apiKey);
    const options = {
      uploadInBackground: false,
      fromSources: ['local_file_system'],
      storeTo: {
        location: 'azure',
      },

      onFileUploadFinished: result => {
        this.props.dispatchFormPost({
          schoolId: this.props.schoolId,
          file: result.url,
        });
      },
    };

    filePicker.picker(options).open();
  };
  render() {
    const SchoolId = this.props.schoolId;
    return (
      <div className="ImportPrograms__button">
        <button
          className="pt-button pt-intent-primary "
          onClick={() => {
            this.handleFileUpload();
          }}
        >
          <div className="ImportPrograms__select">Select file</div>
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    schoolProfile: state.school.Profile,
  };
};

export default connect(
  ImportPrograms,
  mapStateToProps
);
