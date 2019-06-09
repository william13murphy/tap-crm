import React from 'react';
import { Omnibar } from '@blueprintjs/select';
import ResultItem from 'components/Search/ResultItem';
import ResultEmpty from 'components/Search/ResultEmpty';

import './styles.less';

const filterItem = (query, item) => {
  if (!query) {
    return true;
  } else {
    return item.label.toLowerCase().includes(query.toLowerCase());
  }
};

type OmnibarSearchProps = {
  items: Array<{
    label: string,
    value: string,
  }>,
  isOpen: boolean,
  handleItemSelect: Function,
  handleClose: Function,
  handleClick: Function,
  children: React.DOMElement<any>,
};

class OmnibarSearch extends React.Component {
  props: OmnibarSearchProps;
  render() {
    return (
      <div>
        <Omnibar
          className="Omnibar"
          // value={this.state.selectedOption && this.state.selectedOption.value}
          itemPredicate={filterItem}
          itemRenderer={ResultItem}
          items={this.props.items}
          noResults={ResultEmpty}
          onItemSelect={this.props.handleItemSelect}
          onClose={this.props.handleClose}
          isOpen={this.props.isOpen}
          // inputProps={{ onBlur: this.handleBlur }}
        />
        {this.props.children}
      </div>
    );
  }
}

export default OmnibarSearch;
