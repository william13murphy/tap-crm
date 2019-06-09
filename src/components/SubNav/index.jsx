import React from 'react';
import './styles.less';
import connect from 'src/redux/connect';
import { navSubNavHeight } from 'src/redux/actionCreators/nav';

type SubNavProps = {
  nav: {
    efcNavHeight: number,
    schoolNavHeight: number,
    subNavHeight: number,
  },
  dispatchNavSubNavHeight: any,
};

class SubNav extends React.Component {
  props: SubNavProps;
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    setTimeout(() => {
      this.handleResize();
    }, 0);
  }
  handleResize = () => {
    if (this.subNavDiv) {
      this.props.dispatchNavSubNavHeight(this.subNavDiv.clientHeight);
    }
  };
  componentWillUnmount() {
    this.props.dispatchNavSubNavHeight(0);
    window.removeEventListener('resize', this.handleResize);
  }
  componentDidUpdate() {
    if (this.props.children) {
      if (this.props.nav.subNavHeight === 0) {
        if (this.subNavDiv.clientHeight != 0) {
          this.props.dispatchNavSubNavHeight(this.subNavDiv.clientHeight);
        }
      }
    }
  }
  renderSubNav() {
    if (this.props.children) {
      return (
        <div
          className="SubNav"
          ref={div => {
            this.subNavDiv = div;
          }}
          style={{
            top:
              this.props.nav.efcNavHeight +
              this.props.nav.schoolNavHeight +
              this.props.nav.mobileNavHeight,
          }}
        >
          {this.props.children}
        </div>
      );
    } else {
      return null;
    }
  }
  render() {
    return <div className="SubNav__wrapper">{this.renderSubNav()}</div>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchNavSubNavHeight: height => {
      dispatch(navSubNavHeight(height));
    },
  };
};

function mapStateToProps(state) {
  return {
    nav: state.nav,
    token: state.token,
  };
}

export default connect(
  SubNav,
  mapStateToProps,
  mapDispatchToProps
);
