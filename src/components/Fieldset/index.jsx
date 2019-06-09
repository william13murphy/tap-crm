import React from 'react';
import './styles';

type FieldsetProps = {
  title?: string,
  children: any,
};

const Fieldset = (props: FieldsetProps) => {
  return (
    <div className="Fieldset">
      {props.title ? <h2 className="Fieldset__title">{props.title}</h2> : null}
      <div className="Fieldset__content">{props.children}</div>
    </div>
  );
};

export default Fieldset;
