import { log } from 'log';
import { ENV_MIGRATION, ENV_PRODUCTION, ENV_PRODUCTION_TWO, ENV_SANDBOX, getEnvironmentName } from 'util/environment/name';

const env = getEnvironmentName();

// ENV_LOCAL, ENV_DEV, ENV_QA, ENV_STAGING:
let apiDomain = 'https://dev-api-aquilav2.azurewebsites.net';
let kioskApiDomain = 'https://tap-dev-kiosk-ws.efconline.com';

// Temporary work-around for ENV_DEV, if Azure server is down:
// if (env === ENV_DEV) {
//   apiDomain = 'http://tap-dev-ws.efconline.com';
//   kioskApiDomain = 'http://tap-dev-kiosk-ws.efconline.com';
// }

// Dev servers are not included, since they will use the above apiDomains & kioskApiDomain.
if (env === ENV_MIGRATION) {
  apiDomain = 'https://tapmigrationsapi.azurewebsites.net';
  kioskApiDomain = 'https://tapmigrationkioskapi.azurewebsites.net';
} else if (env === ENV_SANDBOX) {
  apiDomain = 'https://budotap-api-sandbox.azurewebsites.net';
  kioskApiDomain = 'https://budotapkioskapi-sandbox.azurewebsites.net';
} else if (env === ENV_PRODUCTION || env === ENV_PRODUCTION_TWO) {
  apiDomain = 'https://budotapapi.azurewebsites.net';
  kioskApiDomain = 'https://budotapkioskapi.azurewebsites.net';
}

log('%c> apiDomain: ', 'color: magenta', apiDomain);
log('%c> kioskApiDomain: ', 'color: magenta', kioskApiDomain);

export { apiDomain, kioskApiDomain };

