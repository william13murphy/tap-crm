import React from 'react';
import './styles.less';

// LoadingPlaceholder specifies a height & width for a loading component,
// for the purpose of reducing component movement when loading.

type LoadingPlaceholderProps = {
  height: number,
  width: number,
  children: React.DOMElement<any>,
};

const LoadingPlaceholder = props => {
  // WARNING: DO NOT console.log props here or it will cause a memory leak!

  // Only set position: relative for elements who want to contain the spinner. This allows larger containers to keep the spinner centered.
  let position = null;
  if (props.height || props.width) {
    position = 'relative';
  }

  const style = {
    height: (props.height && props.height.toString() + 'px') || null,
    width: (props.width && props.width.toString() + 'px') || null,
    position,
  };
  return (
    <div className="LoadingPlaceholder" style={style}>
      {props.children}
    </div>
  );
};

export default LoadingPlaceholder;
