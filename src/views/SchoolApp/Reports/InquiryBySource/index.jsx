import React from 'react';
import connect from 'src/redux/connect';
import SimpleBarChart from 'components/Charts/SimpleBarChart';
import ResponsiveChartWrapper from 'components/Charts/ResponsiveChartWrapper';

type InquiryBySourceProps = {
  report: {
    inquiryBySource: {
      fetching: boolean,
      payload: {},
      status: string,
    },
  },
  columns: number,
  sideNav?: boolean,
};

class InquiryBySource extends React.Component {
  props: InquiryBySourceProps;

  constructor(props) {
    super(props);
    this.state = {
      source: [],
      programs: [],
    };
  }

  componentDidMount() {
    const { inquiryBySource } = this.props.report;

    if (inquiryBySource.payload) {
      let source = [];
      let programsObject;
      for (let key in inquiryBySource.payload) {
        programsObject = inquiryBySource.payload[key];
        source.push({
          name: key,
          ...inquiryBySource.payload[key],
        });
      }

      let programs = Object.keys(programsObject);
      this.setState({
        source,
        programs,
      });
    }
  }

  render() {
    return (
      <div className="InquiryBySource">
        <ResponsiveChartWrapper
          columns={this.props.columns}
          sideNav={this.props.sideNav}
        >
          <SimpleBarChart
            data={this.state.source}
            dataKeys={this.state.programs}
            stackId="a"
          />
        </ResponsiveChartWrapper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    report: state.report,
  };
}

export default connect(
  InquiryBySource,
  mapStateToProps
);
