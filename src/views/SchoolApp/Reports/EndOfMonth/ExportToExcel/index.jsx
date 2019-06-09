import React from 'react';
import connect from 'src/redux/connect';
import { excelToBase64String } from 'util/base64';

type ExportToExcelProps = {
  eomExcel: {},
};

class ExportToExcel extends React.Component {
  props: ExportToExcelProps;

  constructor(props) {
    super(props);
    this.state = {
      base64data: '',
    };
  }

  componentWillMount() {
    if (this.props.eomExcel.payload) {
      let base64String = excelToBase64String(this.props.eomExcel.payload);
      base64String.then(value => {
        this.setState({
          base64data: value,
        });
      });
    }
  }

  render() {
    return (
      <div>
        {this.props.eomExcel.payload ? (
          <a href={this.state.base64data} target="_blank" download>
            <button className="pt-button pt-intent-primary pt-icon-export export-button">
              Export to Excel
            </button>
          </a>
        ) : (
          <a href={this.state.base64data} target="_blank">
            <button
              className="pt-button pt-intent-primary pt-icon-export export-button"
              disabled
            >
              Export to Excel
            </button>
          </a>
        )}
      </div>
    );
  }
}

export default connect(ExportToExcel);
