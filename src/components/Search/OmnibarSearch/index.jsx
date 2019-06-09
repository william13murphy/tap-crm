import React from 'react';
import { Omnibar } from '@blueprintjs/select';
import ResultItem from 'components/Search/ResultItem';
import ResultEmpty from 'components/Search/ResultEmpty';
import './styles.less';

type OmnibarSearchProps = {
  options: Array<{
    label: string,
    value: string,
  }>,
};

const filterItem = (query, item) => {
  if (!query) {
    return true;
  } else {
    return item.label.toLowerCase().includes(query.toLowerCase());
  }
};

class OmnibarSearch extends React.Component {
  props: OmnibarSearchProps;
  state = {
    isOpen: false,
    selectedOption: null,
  };
  componentWillMount() {
    if (this.props.initialValue) {
      this.setState({ selectedOption: this.props.initialValue });
    }
  }

  // handleItemSelect fires when the item is selected with keyboard:
  handleItemSelect = item => {
    this.setState({ isOpen: false });
  };

  // handleClick fires when button is clicked to open Omnibar
  handleClick = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleToggle = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    return (
      <div>
        <Omnibar
          className="Omnibar"
          {...this.state}
          itemPredicate={filterItem}
          itemRenderer={ResultItem}
          items={this.props.options}
          noResults={ResultEmpty}
          onItemSelect={this.handleItemSelect}
          onClose={this.handleClose}
        />
        <button onClick={this.handleClick} className="Select__child pt-button">
          Search
        </button>
      </div>
    );
  }
}

export default OmnibarSearch;
