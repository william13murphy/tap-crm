/* global window.locale */

import React from 'react';
import locales from 'src/util/localization/locales';

type LocalComponentProps = {
  components: {},
};

// Instructions: Using the `components` prop, pass in an object, with the locales
// as its keys. See `src/util/localization/locales`;

// For example:

/*

import LocalComponent from 'components/Localization/LocalComponent';
import locales from 'api/locales';

const localComponents = {
  [locales.UnitedStates]: <span>USA</span>,
  [locales.Australia]: <span>Australia</span>,
  [locales.UnitedKingdom]: <span>UnitedKingdom</span>,
};

<LocalComponent components={localComponents} />

Then, rendering LocalComponent will render the correct component based on window.locale.

*/

const LocalComponent = (props: LocalComponentProps) => {
  if (props.components) {
    return Object.keys(locales).filter(locale => {
      if (window.locale === locale) {
        return props.components[locale];
      }
    });
  } else {
    return null;
  }
};

export default LocalComponent;
