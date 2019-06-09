import React from 'react';
import './styles.less';

class BreadcrumbsCard extends React.Component {
  props: {
    children: [],
  };
  render() {
    return (
      <ul className="BreadcrumbsCard pt-card pt-elevation-2">
        {this.props.children.map((cV, i) => {
          return <li key={i}>{cV}</li>;
        })}
      </ul>
    );
  }
}

export default BreadcrumbsCard;
