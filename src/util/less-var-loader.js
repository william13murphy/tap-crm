const lessToJs = require('less-vars-to-js');

// Replace all occurrences of a character in a string.
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

// Replace dashes and remove @ from less variable keys.
function replaceIllegalCharactersInKeys(dashyObj) {
  const newObj = {};
  for (const oldKey of Object.keys(dashyObj)) {
    const noAtKey = oldKey.substr(1, oldKey.length - 1);
    const noDashKey = noAtKey.replaceAll('-', '_');
    newObj[noDashKey] = dashyObj[oldKey];
  }
  return newObj;
}

// If a variable is referencing another variable above it,
// then replace it with the original value.
function replaceVariableReferences(obj) {
  const replacedObjArray = Object.keys(obj).map(key => {
    const val = obj[key];
    const valIndex = Object.keys(obj).indexOf(val);
    if (valIndex != -1) {
      return { [key]: obj[Object.keys(obj)[valIndex]] };
    } else {
      return { [key]: val };
    }
  });
  return Object.assign({}, ...replacedObjArray);
}

module.exports = function(content) {
  const replacedVarsObject = replaceVariableReferences(lessToJs(content));
  const replacedIllegalCharactersObject = replaceIllegalCharactersInKeys(
    replacedVarsObject
  );

  const jsVariablesClean = JSON.stringify(replacedIllegalCharactersObject);
  return `module.exports = ${jsVariablesClean}`;
};
