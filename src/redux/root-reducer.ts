import { combineReducers } from '@reduxjs/toolkit';
import filters from '../Features/Filters/reducer';
import metrics from './metric/reducer';

// Combining reducers using combineReducers - API avilable from redux to split reducers
const reducer = combineReducers({
  filters,
  metrics,
});

// Exposing APP state via ReturnType (from TypeScript)
export type IAppState = ReturnType<typeof reducer>;

export default reducer;
