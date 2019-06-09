/* global window.locale */

import locales from 'util/localization/locales';

// Private: lists of locales

// Human-readable constants for each region (can contain spaces).
const localRegionList = {
  [locales.Australia]: 'Australia',
  [locales.UnitedStates]: 'United States',
  [locales.Canada]: 'Canada',
  [locales.NewZealand]: 'New Zealand',
  [locales.Ireland]: 'Ireland',
  [locales.UnitedKingdom]: 'United Kingdom',
};

const localCurrencySymbolList = {
  [locales.Australia]: '$',
  [locales.UnitedStates]: '$',
  [locales.Canada]: '$',
  [locales.NewZealand]: '$',
  [locales.Ireland]: '€',
  [locales.UnitedKingdom]: '£',
};

const localCurrencyCodelList = {
  [locales.Australia]: 'AUD',
  [locales.UnitedStates]: 'USD',
  [locales.Canada]: 'CAD',
  [locales.NewZealand]: 'NZD', //no reference option
  [locales.Ireland]: 'EUR',
  [locales.UnitedKingdom]: 'PND',
};

const localCurrencyNameList = {
  [locales.Australia]: 'Australian Dollar',
  [locales.UnitedStates]: 'United States Dollar',
  [locales.Canada]: 'Canadian Dollar',
  [locales.NewZealand]: 'New Zealand Dollar',
  [locales.Ireland]: 'Euro',
  [locales.UnitedKingdom]: 'Pound Sterling',
};

const localDateFormatList = {
  [locales.Australia]: 'DD-MM-YYYY',
  [locales.UnitedStates]: 'MM-DD-YYYY',
  [locales.Canada]: 'YYYY-MM-DD',
  [locales.NewZealand]: 'MM-DD-YYYY',
  [locales.Ireland]: 'DD-MM-YYYY',
  [locales.UnitedKingdom]: 'DD-MM-YYYY',
}

// Public: locale methods

export const localRegion = () => localRegionList[window.locale];

// localCurrencySymbol: returns the local currency symbol
export const localCurrencySymbol = () => localCurrencySymbolList[window.locale];
export const localCurrencyCode = () => localCurrencyCodelList[window.locale];

// localCurrencyZero: Displays a zero with the local currency symbol next to id (because `$0` looks cleaner than `$0.00`):
export const localCurrencyZero = () =>
  localCurrencySymbolList[window.locale] + '0';

// localCurrencyValue: Takes in a number and outputs a currency value, as in: 100 => $100.00
export const localCurrencyValue = value => {
  let safeValue = value;
  if (typeof value === 'undefined' || value === null) {
    safeValue = 0;
  }
  return localCurrencySymbol() + safeValue.toFixed(2).toString();
};

export const localCurrencyName = () => localCurrencyNameList[window.locale];

export const localDateFormat = () => localDateFormatList[window.locale];
