    
import { createStandardAction } from 'typesafe-actions';

export const fetchStat = createStandardAction('HEALTH_STATS/FETCH')();
export const statFetchSuccesful = createStandardAction('HEALTH_STATS/FETCH_SUCCESS')();
export const statFetchFailed = createStandardAction('HEALTH_STATS/FETCH_FAILED')();