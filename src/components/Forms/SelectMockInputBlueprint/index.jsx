import React from 'react';
// import Select from 'react-select';
// import 'react-select/dist/react-select.css';
import { Classes, MenuItem } from '@blueprintjs/core';
import { Select, Suggest } from '@blueprintjs/select';
// import InputFlags from 'components/Forms/InputFlags';
import { Position } from '@blueprintjs/core';

import './styles.less'; // NEED THIS FOR BLUEPRINTJS (currently dispabled)

type SelectInputProps = {
  className?: string,
  initialValue?: string,
  options: [],
  placeholder?: string,
  label: any,
};

const filterItem = (query, item) => {
  if (!query) {
    return true;
  } else {
    return item.label.toLowerCase().includes(query.toLowerCase());
  }
};

const renderItem = (item, { handleClick, modifiers }) => {
  // if (!modifiers.filtered) {
  //   return null;
  // }
  return (
    <MenuItem
      className={modifiers.active ? Classes.ACTIVE : ''}
      key={item.label}
      // label={item.label}
      onClick={handleClick}
      text={item.label}
    />
  );
};

class SelectInput extends React.Component {
  props: SelectInputProps;
  state = {
    selectedOption: null,
  };
  componentWillMount() {
    if (this.props.initialValue) {
      this.setState({ selectedOption: this.props.initialValue });
    }
  }
  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };
  render() {
    return (
      <div className={`Select__container ${this.props.className || ''}`}>
        <Select
          className="SelectInput"
          // value={this.state.selectedOption && this.state.selectedOption.value}
          itemPredicate={filterItem}
          itemRenderer={renderItem}
          items={this.props.options}
          noResults={<MenuItem disabled={true} text="No results." />}
          onItemSelect={this.handleChange}
          placeholder={this.props.placeholder || 'Select a choice'}
          popoverProps={{
            position: Position.TOP,
            // minimal: true,
            modifiers: {
              preventOverflow: false, // this is not currently working:  (http://blueprintjs.com/docs/v2/#core/components/popover.modifiers -- Note: it is not currently possible to configure Popover's modifiers through the modifiers prop, nor can you define your own with the same name.)
            },
          }}
        >
          <div className="Select__child pt-button pt-icon-caret-down">
            {this.state.selectedOption
              ? this.state.selectedOption.label
              : 'Nullsies'}
          </div>
        </Select>
      </div>
    );
  }
}

/*

<input
  type="text"
  className="pt-input"
  value={
    this.state.selectedOption
      ? this.state.selectedOption.label
      : 'Nullsies'
  }
/>

*/

export default SelectInput;
