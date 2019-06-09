//topSectionClassName = this.props.topSectionClassName
//nav = this.props.nav
export const setDashboardGridHeight = (topSectionClassName, nav) => {
  // Get grid header & filter height
  const tableHeaderHeight = 0;
  const tableFiltersHeight = 0;

  // Add padding below the grid
  const bottomPadding = 3; // Reduce bottom padding to match it with TaskList Table
  const bufferHeight = 90;

  // Get height of section above the grid
  const topSectionHeight =
    document.getElementsByClassName(topSectionClassName || 'PageHeader') &&
    document.getElementsByClassName(topSectionClassName || 'PageHeader')[0]
      ? document.getElementsByClassName(topSectionClassName || 'PageHeader')[0]
          .clientHeight
      : 0;

  // Calculate table body height
  let tableBodyHeight =
    window.innerHeight -
    (nav.efcNavHeight +
      nav.schoolNavHeight +
      nav.subNavHeight +
      topSectionHeight +
      bottomPadding +
      tableHeaderHeight +
      tableFiltersHeight +
      bufferHeight);

  // Minimum table height:
  if (tableBodyHeight < 170) {
    tableBodyHeight = 170;
  }
  return tableBodyHeight;
};
//-----------------------------------
//create function to add up params, determine what are required
setGridHeight = (
  pageHeaderHeight,
  tableHeaderHeight,
  tableFiltersHeight,
  bottomSectionHeight,
  bufferHeight
) => {
  const pageHeaderHeight =
    document.getElementsByClassName('Dashboard__header')[0].clientHeight || 0;

  // Get grid header & filter height
  const tableHeaderHeight =
    document.getElementsByClassName('-header')[0].clientHeight || 0;

  const tableFiltersHeight =
    document.getElementsByClassName('-filters')[0].clientHeight || 0;

  // Get height of section above the grid
  const bottomSectionHeight =
    document.getElementsByClassName('PageHeader')[0].clientHeight || 0;

  const bufferHeight = 40;

  // Calculate table body height
  let tableBodyHeight =
    window.innerHeight -
    (this.props.nav.efcNavHeight +
      this.props.nav.schoolNavHeight +
      this.props.nav.subNavHeight +
      pageHeaderHeight +
      tableHeaderHeight +
      tableFiltersHeight +
      bottomSectionHeight +
      bufferHeight);

  // Minimum table height:
  if (tableBodyHeight < 110) {
    tableBodyHeight = 110; // 170 - 60 for header and filter rows
  }

  this.setState({
    height: tableBodyHeight,
  });
};
