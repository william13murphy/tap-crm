import React from 'react';

type ModuleProps = {
  className?: string,
  children: React.DOMElement<any>,
};

// Module: Element which contains Pages
// Module has no style attributes as it is a semantic container only.

const Module = (props: ModuleProps) => (
  <div className={`Module ${props.className || ''}`}>{props.children}</div>
);

export default Module;
