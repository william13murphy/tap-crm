import { log } from 'log';

// Calculates PageBody Height
// Must have a ModuleHeader and PageFooter rendered.
const calculatePageBodyHeight = () => {
  const mainBody = document.getElementsByClassName('Body')[0];
  const header = document.getElementsByClassName('ModuleHeader')[0];
  const footer = document.getElementsByClassName('PageFooter')[0];

  const mainBodyHeight = mainBody ? mainBody.clientHeight : 0;
  const headerHeight = header ? header.clientHeight : 0;
  const footerHeight = footer ? footer.clientHeight : 0;

  const pageBodyHeight = mainBodyHeight - headerHeight - footerHeight;

  log(
    '%c>>> Page Body Height',
    'color: blue',
    mainBodyHeight,
    headerHeight,
    footerHeight,
    pageBodyHeight
  );
  return pageBodyHeight;
};

export default calculatePageBodyHeight;
