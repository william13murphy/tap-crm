import React from 'react';
// import { getInternalContacts } from 'api';
import connect from 'src/redux/connect';
import tempInternalContacts from 'src/redux/data/tempInternalContacts';

type ReferenceSelectOptionsProps = {
  children: any, // React Element, one
  referenceListName: string,
  references: {},
};

class ReferenceSelectOptions extends React.Component {
  props: ReferenceSelectOptionsProps;
  componentWillMount() {
    const internalContacts = tempInternalContacts.map((cV, i) => {
      return {
        label: cV.m_Item2,
        value: cV.m_Item1,
      };
    });
    this.setState({
      options: internalContacts,
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

export default connect(
  ReferenceSelectOptions,
  mapStateToProps
);
