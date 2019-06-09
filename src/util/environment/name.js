const hostname = window && window.location && window.location.hostname;
const HOST_LOCAL = 'localhost';

// Dev Servers
const HOST_DEV = 'tapdev.kinapptech.com';
const HOST_QA = 'tapqa.kinapptech.com';
const HOST_DEMO = 'tapdemo.kinapptech.com';
const HOST_STAGING = 'tapstaging.kinapptech.com';

// UAT Servers
const HOST_MIGRATION = 'tapmigration.kinapptech.com';
const HOST_SANDBOX = 'tapsandbox.kinapptech.com';

// Production Servers
const HOST_PRODUCTION = 'tap.kinapptech.com';
const HOST_PRODUCTION_TWO = 'budocrm.kinapptech.com';

export const ENV_UNKNOWN = 'unknown';
export const ENV_LOCAL = 'local';
export const ENV_QA = 'qa';
export const ENV_DEV = 'dev';
export const ENV_STAGING = 'staging';
export const ENV_DEMO = 'demo';
export const ENV_MIGRATION = 'migration';
export const ENV_SANDBOX = 'sandbox';
export const ENV_PRODUCTION = 'production';
export const ENV_PRODUCTION_TWO = 'production-two';

export const getEnvironmentName = () => {
  if (hostname === HOST_LOCAL) {
    return ENV_LOCAL;
  } else if (hostname === HOST_DEV) {
    return ENV_DEV;
  } else if (hostname === HOST_QA) {
    return ENV_QA;
  } else if (hostname === HOST_DEMO) {
    return ENV_DEMO;
  } else if (hostname === HOST_STAGING) {
    return ENV_STAGING;
  } else if (hostname === HOST_MIGRATION) {
    return ENV_MIGRATION;
  } else if (hostname === HOST_SANDBOX) {
    return ENV_SANDBOX;
  } else if (hostname === HOST_PRODUCTION) {
    return ENV_PRODUCTION;
  } else if (hostname === HOST_PRODUCTION_TWO) {
    return ENV_PRODUCTION_TWO;
  } else {
    return ENV_UNKNOWN;
  }
};
