import React from 'react';
import ContextHelp from 'components/ContextHelp';
import './styles.less';

type RadioFieldGroupProps = {
  label: string,
  children: any,
  id: string, // Display Help message in popover
  help?: boolean,
};

const RadioFieldGroup = (props: RadioFieldGroupProps) => {
  return (
    <div className="RadioFieldGroup">
      <label className="pt-label">{props.label}</label>
      <div className="FieldGroup">
        {props.children}
        {props.help && <ContextHelp id={props.id} />}
      </div>
    </div>
  );
};

export default RadioFieldGroup;
