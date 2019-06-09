import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import InputFlags from 'components/Forms/InputFlags';

import './styles.less';

type SelectInputProps = {
  className?: string,
  initialValue?: string,
  options: [],
  placeholder?: string,
  label: any,
  type: any,
  onChange?: Function, // onChange function
};

class SelectInput extends React.Component {
  props: SelectInputProps;
  state = {
    selectedOption: null,
  };
  componentWillMount() {
    if (this.props.initialValue) {
      this.setState({ selectedOption: { value: this.props.initialValue } });
    }
  }
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    this.props.onChange && this.props.onChange(selectedOption);
  };

  getValueFromId = (options, id) => {
    let result = options.find(element => {
      if (element.value === id) {
        return element;
      }
    });

    return result;
  };

  render() {
    return (
      <div className={`Select__container ${this.props.className || ''}`}>
        <div className="FieldGroup">
          {this.props.label}
          {this.props.help && <ContextHelp id={this.props.id} />}
        </div>
        <Select
          className="SelectInput"
          classNamePrefix="SelectInput"
          name={this.state.selectedOption && this.state.selectedOption.value}
          value={this.getValueFromId(
            this.props.options,
            this.state.selectedOption && this.state.selectedOption.value
          )}
          options={this.props.options}
          onChange={this.handleChange}
          placeholder={this.props.placeholder || 'Select a choice'}
          menuPosition="fixed"
          isClearable={true}
        />
      </div>
    );
  }
}

export default SelectInput;
