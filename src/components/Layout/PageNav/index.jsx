import React from 'react';

type PageNavProps = {
  className?: string,
};

/* PageNav:
 * Use this component to contain a secondary navigation.
 * PageNav's contents will be used in the calculation of DynamicHeightReactTable's height.
 */

const PageNav = props => (
  <div className={`PageNav ${props.className || ''}`}>{props.children}</div>
);

export default PageNav;
