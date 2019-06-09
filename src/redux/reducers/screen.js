import {
  SCREEN_DENSITY,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SCREEN_SIZE_TABLET_SMALL,
  SCREEN_SIZE_TABLET_LARGE,
  SCREEN_SIZE_DESKTOP_LARGE,
} from 'src/redux/actionCreators/screen';

export const screenInitialState = {
  height: 0,
  width: 0,
  sizeTabletSmall: false,
  sizeTabletLarge: false,
  sizeDesktopLarge: false,
};

export const screenReducer = (state, action) => {
  switch (action.type) {
    case SCREEN_SIZE_TABLET_SMALL:
      return Object.assign({}, state, {
        sizeTabletSmall: action.payload.sizeTabletSmall,
      });
    // TODO: Create a thunk that dispatches NAV_MOBILE when size is tabletLarge
    // TODO: In that thunk, close the mobile nav if size =/= mobile
    // case SCREEN_SIZE_TABLET_LARGE:
    //   // Set `nav.mobile`, depending on screen size
    //   const mobileNavObj = {
    //     mobile: !action.payload.sizeTabletLarge,
    //   };
    //   // Close MobileNavMenu when no longer showing MobileNav:
    //   if (action.sizeTabletLarge) {
    //     mobileNavObj['mobileOpen'] = false;
    //   }
    //   return Object.assign({}, state, mobileNavObj);
    case SCREEN_SIZE_TABLET_LARGE:
      return Object.assign({}, state, {
        sizeTabletLarge: action.payload.sizeTabletLarge,
      });
    case SCREEN_SIZE_DESKTOP_LARGE:
      return Object.assign({}, state, {
        sizeDesktopLarge: action.payload.sizeDesktopLarge,
      });
    case SCREEN_DENSITY:
      return Object.assign({}, state, {
        density: action.payload.density,
      });
    case SCREEN_HEIGHT:
      return Object.assign({}, state, {
        height: action.payload.height,
      });
    case SCREEN_WIDTH:
      return Object.assign({}, state, {
        width: action.payload.width,
      });
    default:
      return state;
  }
};
