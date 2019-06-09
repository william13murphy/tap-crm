import React from 'react';
import './styles.less';

type FormChoiceProps = {
  className?: string,
  title?: string,
  children: any,
};

const FormChoice = (props: FormChoiceProps) => {
  return (
    <div className={`${props.className || ''} FormChoice`}>
      <h2 className="FormChoice__title">{props.title}</h2>
      <div className="FormChoice__buttons">{props.children}</div>
    </div>
  );
};

export default FormChoice;
