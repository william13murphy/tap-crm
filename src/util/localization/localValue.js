/* global window.locale */

// Instructions: Using the `components` prop, pass in an object, with the locales
// as its keys. See `src/util/localization/locales`;

// For example:

/*

import localValues from 'src/util/localValues';
import locales from 'api/locales';

const localesObject = {
  [locales.UnitedStates]: <span>USA</span>,
  [locales.Australia]: <span>Australia</span>,
  [locales.UnitedKingdom]: <span>UnitedKingdom</span>,
};

localValue(localComponents)

Then, localValue with return the correct value based on window.locale.

*/

const localValue = (values, country) => {
  if (values) {
    return values[country];
  } else {
    return null;
  }
};

export default localValue;
