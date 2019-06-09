import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import './styles.less';

import InputFlags from 'components/Forms/InputFlags';

type SelectInputProps = {
  className?: string,
  input: any,
  options: [],
  placeholder?: string,
  // These are options passed for the Select menu.
  // Based on the passed in value, SelectMenu is positioned
  InputOptions?: {
    menuPosition: string,
    menuPlacement: string,
    maxMenuHeight: number,
  },
  input: any,
  label: any,
  type: any,
  meta: {
    touched: any,
    error: any,
    warning: any,
  },
  disabled: boolean,
};

// This method compares the options with the passed in value,
// and returns the element which matches.
// This is added, as there has been a change made in the react-select version 2
const getValueFromId = (options, id) => {
  let result = options.find(element => {
    if (element.value === id) {
      return element;
    }
  });

  return result;
};

const SelectInput = (props: SelectInputProps) => {
  return (
    <div className={`Select__container ${props.className || ''}`}>
      <Select
        className={`${
          props.input.value === '' ? 'no-clear' : ''
        }  SelectInput ${props.meta.touched && 'touched'} ${props.meta.error &&
          'error'} ${props.disabled ? 'no-clear is-disabled' : ''}
          `}
        classNamePrefix="SelectInput"
        options={props.options}
        name={props.input.name}
        value={getValueFromId(props.options, props.input.value)}
        onChange={e => {
          if (e) {
            props.input.onChange(e.value);
          } else {
            props.input.onChange('');
          }
        }}
        onBlur={e => {
          props.input.onBlur(props.input.value);
        }}
        autoBlur={true}
        placeholder={props.placeholder || 'Select a choice'}
        menuPosition={
          (props.InputOptions && props.InputOptions.menuPosition) || 'fixed'
        }
        menuPlacement={
          (props.InputOptions && props.InputOptions.menuPlacement) || 'bottom'
        }
        isClearable={true}
      />
      <InputFlags meta={props.meta} />
    </div>
  );
};

export default SelectInput;
