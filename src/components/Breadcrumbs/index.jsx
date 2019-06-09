import React from 'react';
import { Link } from 'react-router-dom';
import './styles.less';

class Breadcrumbs extends React.Component {
  props: {
    list: Array<{
      to?: string,
      label: string,
      current?: boolean,
      onClick: Function,
    }>,
  };
  render() {
    return (
      <ul className="Breadcrumbs pt-breadcrumbs">
        {this.props.list.map((currentValue, i) => {
          if (currentValue.current) {
            return (
              <li key={i}>
                <span className="pt-breadcrumb pt-breadcrumb-current">
                  {currentValue.label}
                </span>
              </li>
            );
          } else {
            return (
              <li key={i}>
                <Link
                  className="pt-breadcrumb"
                  to={currentValue.to}
                  onClick={currentValue.onClick}
                >
                  {currentValue.label}
                </Link>
              </li>
            );
          }
        })}
      </ul>
    );
  }
}

export default Breadcrumbs;
