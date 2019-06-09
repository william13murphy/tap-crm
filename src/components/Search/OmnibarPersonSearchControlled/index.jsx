import React from 'react';
import { Omnibar } from '@blueprintjs/select';

import ResultItemPerson from 'components/Search/ResultItemPerson';
import ResultEmpty from 'components/Search/ResultEmpty';

import './styles.less';

const filterItem = (query, item) => {
  if (!query) {
    return true;
  } else {
    return item.name.toLowerCase().includes(query.toLowerCase());
  }
};

type OmnibarPersonSearchProps = {
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

class OmnibarPersonSearch extends React.Component {
  props: OmnibarPersonSearchProps;
  render() {
    return (
      <div>
        <Omnibar
          className="Omnibar"
          // value={this.state.selectedOption && this.state.selectedOption.value}
          itemPredicate={filterItem}
          itemRenderer={ResultItemPerson}
          items={this.props.items}
          noResults={ResultEmpty}
          onItemSelect={this.props.handleItemSelect}
          onClose={this.props.handleClose}
          isOpen={this.props.isOpen}
          resetOnSelect={true}
          // inputProps={{ onBlur: this.handleBlur }}
        />
        {this.props.children}
      </div>
    );
  }
}

export default OmnibarPersonSearch;
