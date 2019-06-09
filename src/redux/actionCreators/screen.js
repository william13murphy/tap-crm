import { createAction } from 'redux-actions';

export const SCREEN_DENSITY = 'screen/DENSITY';
export const SCREEN_HEIGHT = 'screen/HEIGHT';
export const SCREEN_WIDTH = 'screen/WIDTH';

export const SCREEN_SIZE_TABLET_SMALL = 'screen/SIZE_TABLET_SMALL';
export const SCREEN_SIZE_TABLET_LARGE = 'screen/SIZE_TABLET_LARGE';
export const SCREEN_SIZE_DESKTOP_LARGE = 'screen/SIZE_DESKTOP_LARGE';

export const screenDensity = createAction(SCREEN_DENSITY);
export const screenHeight = createAction(SCREEN_HEIGHT);
export const screenWidth = createAction(SCREEN_WIDTH);

export const screenSizeTabletSmall = createAction(SCREEN_SIZE_TABLET_SMALL);
export const screenSizeTabletLarge = createAction(SCREEN_SIZE_TABLET_LARGE);
export const screenSizeDesktopLarge = createAction(SCREEN_SIZE_DESKTOP_LARGE);
