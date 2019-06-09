import React from 'react';
import DefaultReactTable from 'components/Grid/DefaultReactTable';
import connect from 'src/redux/connect';

// NOTE: This component depends on a <PageHeader /> component above it (which has className="PageHeader"),
// to determine the header's height, and auto-size the grid appropriately.
// If that is not the case, can optionally pass in a prop topSectionClassName.

type DynamicHeightReactTableProps = {
  data: Array<{}>,
  history?: {}, // required to make a row or cell linkable by pushing to history onClick
  nav: {
    efcNavHeight: number,
    schoolNavHeight: number,
    subNavHeight: number,
  },
  topSectionClassName?: string,
  pageNavClassName?: string,
  verticalBuffer?: number, // Any extra space due to padding.
};

/* Related Components:
 * PageHeader: Used in calculation of grid height.
 * PageNav: Page-level navigation component, used in calculation of grid height.
 */

class DynamicHeightReactTable extends React.Component {
  props: DynamicHeightReactTableProps;

  constructor() {
    super();
    this.setGridHeight = this.setGridHeight.bind(this);
    this._isMounted = false;

    this.state = {
      height: 500, // default table height
    };
  }
  setGridHeight = () => {
    // Get grid header & filter height

    const verticalBuffer = this.props.verticalBuffer || 0;

    const tableHeaderHeight =
      (document.getElementsByClassName('-header') &&
        document.getElementsByClassName('-header')[0] &&
        document.getElementsByClassName('-header')[0].clientHeight) ||
      0;
    const tableFiltersHeight =
      (document.getElementsByClassName('-filters') &&
        document.getElementsByClassName('-filters')[0] &&
        document.getElementsByClassName('-filters')[0].clientHeight) ||
      0;
    // Get height of section above the grid
    const topSectionHeight = document.getElementsByClassName(
      this.props.topSectionClassName || 'PageHeader'
    )[0].clientHeight;
    // Add padding below the grid
    const bottomPadding = 22;
    const pageNavHeight =
      (document.getElementsByClassName(
        this.props.pageNavClassName || 'PageNav'
      ) &&
        document.getElementsByClassName(
          this.props.pageNavClassName || 'PageNav'
        )[0] &&
        document.getElementsByClassName(
          this.props.pageNavClassName || 'PageNav'
        )[0].clientHeight) ||
      0;

    // Calculate table body height
    let tableBodyHeight =
      window.innerHeight -
      (this.props.nav.efcNavHeight +
        this.props.nav.schoolNavHeight +
        this.props.nav.subNavHeight +
        topSectionHeight +
        bottomPadding +
        tableHeaderHeight +
        tableFiltersHeight +
        pageNavHeight +
        verticalBuffer);

    // Minimum table height:
    if (tableBodyHeight < 100) {
      tableBodyHeight = 100;
    }

    this.setState({
      height: tableBodyHeight,
    });
  };

  componentDidMount() {
    this._isMounted = true;
    setTimeout(() => {
      if (this._isMounted) {
        this.setGridHeight();
      }
    }, 0);
    window.addEventListener('resize', this.setGridHeight);
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener('resize', this.setGridHeight);
  }

  render() {
    return (
      <DefaultReactTable
        getTbodyProps={() => {
          return {
            style: {
              height: this.state.height,
            },
          };
        }}
        {...this.props}
        className={`DynamicHeightReactTable ${this.props.className || ''}`}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    nav: state.nav,
  };
};

export default connect(
  DynamicHeightReactTable,
  mapStateToProps
);
