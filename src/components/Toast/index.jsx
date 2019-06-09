import FormToaster from 'components/Toast/FormToaster';

const Toast = () => {};

Toast.show = message => {
  FormToaster.show({
    message: message,
    timeout: 2000,
  });
};

Toast.showError = message => {
  FormToaster.show({
    message: message,
    icon: 'error',
    timeout: 2000,
    className: 'fail',
  });
};

Toast.showSuccess = message => {
  FormToaster.show({
    message: message,
    // intent: 'success',
    icon: 'tick-circle',
    timeout: 2000,
    className: 'success',
  });
};

export default Toast;
