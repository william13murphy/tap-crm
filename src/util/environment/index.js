import locales from 'src/util/localization/locales';

import { getEnvironmentName } from 'util/environment/name';

import { VERSION_NUMBER } from 'util/release';

// TODO: Remove any window env vars and instead import them from this file.

// TODO: Disable sessionStorageTokenEnabled before going to production
// Deprecated: Session Storage Token
// let sessionStorageTokenEnabled = false;
let cookieTokenEnabled = true;

// Assets path:
window.ASSETS_PATH = '/assets';

// Locale:
window.locale = locales.UnitedStates; // UnitedStates, Australia, UnitedKingdom

// Production environment:
window.PRODUCTION_ENVIRONMENT = false;

// Role global variable for WalkMe.
window.TAPRole = null;

const setRoleEnvironmentVariable = function(role) {
  window.TAPRole = role;
};

const getEnvironmentVariables = () => {
  declare var window: any;

  return {
    name: getEnvironmentName(),
    versionNumber: VERSION_NUMBER,
    locale: window.locale,
    // sessionStorageTokenEnabled,
    cookieTokenEnabled,
    assetsPath: window.ASSETS_PATH,
    productionEnvironment: window.PRODUCTION_ENVIRONMENT,
  };
};

export { getEnvironmentVariables, setRoleEnvironmentVariable };
