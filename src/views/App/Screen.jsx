// @flow
import React from 'react';

import connect from 'src/redux/connect';
import {
  screenSizeTabletSmall,
  screenSizeTabletLarge,
  screenSizeDesktopLarge,
  screenDensity,
  screenHeight,
  screenWidth,
} from 'src/redux/actionCreators/screen';

// TODO: Import variables from less: https://www.npmjs.com/package/less-vars-to-js
const mediaQueryDimensions: { [string]: number } = {
  tabletSmall: 768, // min-width
  tabletLarge: 910,
  desktopSmall: 1025,
  desktopMedium: 1201,
  desktopLarge: 1601,
  desktopXLarge: 1921,
};

class Screen extends React.Component {
  props: {
    screen: any,
    dispatchScreenDensity: any,
    dispatchScreenHeight: any,
    dispatchScreenWidth: any,
    dispatchScreenSizeTabletSmall: any,
    dispatchScreenSizeTabletLarge: any,
    dispatchScreenSizeDesktopLarge: any,
  };
  componentWillMount() {
    this.createResizeListener();
    this.props.dispatchScreenDensity(window.devicePixelRatio);
  }
  componentDidMount() {
    this.createMediaQueryListeners();
  }
  createResizeListener() {
    this.handleResize();
    window.addEventListener('resize', () => {
      this.handleResize();
    });
  }
  handleResize() {
    if (window.innerHeight !== this.props.screen.height) {
      this.props.dispatchScreenHeight(window.innerHeight);
    }
    if (window.innerWidth !== this.props.screen.width) {
      this.props.dispatchScreenWidth(window.innerWidth);
    }
  }
  createMediaQueryListeners() {
    // Screen min width > tabletSmall
    const tabletSmallMinWidth =
      mediaQueryDimensions.tabletSmall.toString() + 'px';
    const tabletSmallMinWidthCheck = window.matchMedia(
      `(min-width: ${tabletSmallMinWidth})`
    );
    tabletSmallMinWidthCheck.addListener(
      this.props.dispatchScreenSizeTabletSmall
    );
    this.props.dispatchScreenSizeTabletSmall(tabletSmallMinWidthCheck);

    // Screen min width > tabletLarge
    const tabletLargeMinWidth =
      mediaQueryDimensions.tabletLarge.toString() + 'px';
    const tabletLargeMinWidthCheck = window.matchMedia(
      `(min-width: ${tabletLargeMinWidth})`
    );
    tabletLargeMinWidthCheck.addListener(
      this.props.dispatchScreenSizeTabletLarge
    );
    this.props.dispatchScreenSizeTabletLarge(tabletLargeMinWidthCheck);

    // Screen min width > desktopLarge
    const desktopLargeMinWidth =
      mediaQueryDimensions.desktopLarge.toString() + 'px';
    const desktopLargeMinWidthCheck = window.matchMedia(
      `(min-width: ${desktopLargeMinWidth})`
    );
    desktopLargeMinWidthCheck.addListener(
      this.props.dispatchScreenSizeDesktopLarge
    );
    this.props.dispatchScreenSizeDesktopLarge(desktopLargeMinWidthCheck);
  }
  render() {
    return null;
  }
}

function mapStateToProps(state) {
  return {
    screen: state.screen,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchScreenDensity: density => {
      dispatch(screenDensity({ density }));
    },
    dispatchScreenHeight: height => {
      dispatch(screenHeight({ height }));
    },
    dispatchScreenWidth: width => {
      dispatch(screenWidth({ width }));
    },
    dispatchScreenSizeTabletSmall: mediaQueryList => {
      dispatch(
        screenSizeTabletSmall({ sizeTabletSmall: mediaQueryList.matches })
      );
    },
    dispatchScreenSizeTabletLarge: mediaQueryList => {
      dispatch(
        screenSizeTabletLarge({ sizeTabletLarge: mediaQueryList.matches })
      );
    },
    dispatchScreenSizeDesktopLarge: mediaQueryList => {
      dispatch(
        screenSizeDesktopLarge({ sizeDesktopLarge: mediaQueryList.matches })
      );
    },
  };
};

export default connect(Screen, mapStateToProps, mapDispatchToProps);
