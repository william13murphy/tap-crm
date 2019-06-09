import Cookies from 'js-cookie';
import { store } from 'views/App/Redux';

import tokenTest from 'util/auth/tokenTest';

import { getEnvironmentVariables } from 'util/environment';

import { setRoleEnvironmentVariable } from 'util/environment';

const TOKEN_COOKIE = 'token';

const env = getEnvironmentVariables();

export function getTokenFromStore(kiosk) {
  let tokenPayload = undefined;
  if (kiosk) {
    tokenPayload = store.getState().kiosk.token.payload;
  } else {
    tokenPayload = store.getState().token.payload;
  }
  // If token is in the store, return the token.
  if (tokenPayload) {
    return tokenPayload.access_token;
  } else {
    const cachedToken = getCachedToken();
    return cachedToken.access_token;
  }
}

export function getCachedToken() {
  if (env.cookieTokenEnabled) {
    const cookieToken = getCookieToken();
    if (cookieToken && cookieToken !== '""' && cookieToken !== '') {
      const parsedCookieToken = JSON.parse(cookieToken);
      if (tokenTest(parsedCookieToken).valid) {
        return parsedCookieToken;
      } else {
        log('getCachedToken(): cookieToken invalid, returning null');
        return null;
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
}

export function setTokenCache(payload) {
  if (env.cookieTokenEnabled) {
    setCookieToken(payload);
  }
}

export function resetCachedTokens() {
  setTokenCache('');
  setRoleEnvironmentVariable(null); // Reset Role attribute for WalkMe
}

// Session storage cache
export function setSessionStorageToken(payload) {
  window.sessionStorage.setItem('token', JSON.stringify(payload));
}
export function getSessionStorageToken() {
  if (window.sessionStorage.token) {
    return window.sessionStorage.token;
  } else {
    return null;
  }
}

export function resetSessionStorageToken() {
  window.sessionStorage.setItem('token', '');
}

export function setCookieToken(payload) {
  Cookies.remove(TOKEN_COOKIE);
  Cookies.set(TOKEN_COOKIE, JSON.stringify(payload));
}

export function getCookieToken() {
  return Cookies.get(TOKEN_COOKIE);
}

export function resetCookieToken() {
  Cookies.set(TOKEN_COOKIE, '');
}
