import React from 'react';
import connect from 'src/redux/connect';
import './styles.less';


type BodyProps = {
  nav: {
    efcNavHeight: number,
    schoolNavHeight: number,
    subNavHeight: number,
  },

  children: React.Element<any>,
};

class Body extends React.Component {
  props: BodyProps;
  render() {
    return (
      <div
        className={`Body ${this.props.className ? this.props.className : ''}`}
        style={{
          top:
            this.props.nav.efcNavHeight +
            this.props.nav.schoolNavHeight +
            this.props.nav.mobileNavHeight +
            this.props.nav.subNavHeight,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    nav: state.nav,
    token: state.token,
  };
}

export default connect(
  Body,
  mapStateToProps
);
