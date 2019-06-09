import React from 'react';
import { getReferenceItemOptions } from 'api/referenceItems';
import connect from 'src/redux/connect';

type ReferenceSelectOptionsProps = {
  children: any, // React Element, one
  referenceListName: string,
  references: {},
};

class ReferenceSelectOptions extends React.Component {
  props: ReferenceSelectOptionsProps;
  componentWillMount() {
    this.setState({
      options: getReferenceItemOptions(
        this.props.referenceListName,
        this.props.references
      ),
    });
  }
  render() {
    return (
      <div>
        {React.cloneElement(this.props.children, {
          options: this.state.options,
        })}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    references: state.utility.references,
  };
}

export default connect(ReferenceSelectOptions, mapStateToProps);
