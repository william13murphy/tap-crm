// Purpose: Connects a component with redux and react-router

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default (unconnectedComponent, ...mapFunctions) => {
  return withRouter(connect(...mapFunctions)(unconnectedComponent));
};
