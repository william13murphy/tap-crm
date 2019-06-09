import React from 'react';
import connect from 'src/redux/connect';
import { pdfToBase64String } from 'util/base64';

type PlanSummaryDisplayProps = {
  planSummaryPdf: string,
  disabled: boolean,
};

class PlanSummaryPdfDisplay extends React.Component {
  props: PlanSummaryDisplayProps;

  state = {
    base64data: '',
  };

  componentDidMount() {
    if (this.props.planSummaryPdf.payload) {
      let base64String = pdfToBase64String(this.props.planSummaryPdf.payload);
      base64String.then(value => {
        this.setState({
          base64data: value,
        });
      });
    }
  }

  render() {
    return (
      <a href={this.state.base64data} target="_blank" download>
        <button
          className="pt-button pt-intent-primary pt-icon-print"
          disabled={this.props.disabled}
        >
          &nbsp;Print Plan Summary
        </button>
      </a>
    );
  }
}

const mapStateToProps = state => {
  return {
    planSummaryPdf: state.student.planSummaryPdf,
  };
};

export default connect(
  PlanSummaryPdfDisplay,
  mapStateToProps
);
