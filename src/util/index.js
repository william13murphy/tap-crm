export const validateEmail = emailValue => {
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(emailValue)) {
    return 'Invalid email address';
  } else {
    return undefined;
  }
};
