const passwordValidation = {
  lowerCaseLetterValidation: /(?=.*[a-z])/,
  minimumCharacterLengthValidation: /.{8,}/,
  specialCharacterValidation: /(?=.*?[^\w\s])/,
};

export default passwordValidation;
