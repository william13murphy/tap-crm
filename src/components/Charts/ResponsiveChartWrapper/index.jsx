import React from 'react';
import styleVariables from 'styles/_variables';

type ResponsiveChartWrapperProps = {
  columns: number, // 2 for half screen width, 3 for 1/3 width, etc.
  children: React.DOMElement<any>,
  sideNav: boolean,
};

// ResponsiveChartWrapper:
// * Passes a 'responsiveWidth' property to child components
// * Designed for graphs in a 100% or 50% screen width size.

const sideNavWidthBuffer = 20;

class ResponsiveChartWrapper extends React.Component {
  props: ResponsiveChartWrapperProps;
  componentWillMount() {
    this.setState({
      width: 0, // this.getChartWidth() moved to componentDidMount so that sideNavWidth is available,
      sideNavWidth:
        parseInt(styleVariables.sidenav_width.slice(0, -2)) +
        sideNavWidthBuffer,
    });
  }
  componentDidMount() {
    window.addEventListener('resize', this.setStateChartWidth);
    this.setState({
      width: this.getChartWidth(),
    });
  }
  getChartWidth = () => {
    const sideNavWidth = this.props.sideNav ? this.state.sideNavWidth : 0;
    if (this.props.columns) {
      if (window.innerWidth > 768) {
        return (window.innerWidth - sideNavWidth) / this.props.columns - 80;
      } else {
        return window.innerWidth - sideNavWidth - 80;
      }
    } else {
      return window.innerWidth - sideNavWidth - 80;
    }
  };
  setStateChartWidth = () => {
    this.setState({ width: this.getChartWidth() });
  };
  componentWillUnmount() {
    window.removeEventListener('resize', this.setStateChartWidth);
  }
  render() {
    const childrenWithProps = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        responsiveWidth: this.state.width,
      })
    );
    return <div className="ResponsiveChartWrapper">{childrenWithProps}</div>;
  }
}

export default ResponsiveChartWrapper;
