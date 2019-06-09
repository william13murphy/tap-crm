// This file contains all less variables from _base.less,
// for use in javascript.

import 'util/less-var-loader'; // Import solely for webpack to detect changes
import * as _base from '!!../util/less-var-loader!./_base.less';
import * as _colors from '!!../util/less-var-loader!./_colors.less';
import { log } from 'log';

const allLessVariables = Object.assign({}, _base, _colors);
log('All LESS Variables: ', allLessVariables);

export default allLessVariables;
