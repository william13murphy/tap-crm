import React from 'react';
import './styles.less';

type BackButtonProps = {
  children: React.DOMElement<any>,
  intent?: string,
};

const BackButton = (props: BackButtonProps) => (
  <button
    className={`BackButton pt-button pt-intent-${props.intent ||
      'secondary'} pt-icon-chevron-left`}
  >
    {props.children}
  </button>
);

export default BackButton;
