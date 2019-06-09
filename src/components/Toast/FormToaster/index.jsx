import { Position, Toaster } from '@blueprintjs/core';
import './styles.less';

// See Toast/index.jsx for methods which utilize the form toaster.

const FormToaster = Toaster.create({
  className: 'FormToaster',
  position: Position.BOTTOM,
});

export default FormToaster;
