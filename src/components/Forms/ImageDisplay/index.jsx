import React from 'react';
import './styles.less';

type ImageDisplayProps = {
  color: string,
  small?: boolean,
  imageFile: Blob,
};

const ImageDisplay = (props: ImageDisplayProps) => {
  return (
    <img
      className={`ColorDisplay ${props.small ? 'small' : ''}`}
      style={{ background: props.color || '#000' }}
      src={props.imageFile}
    />
  );
};

export default ImageDisplay;
