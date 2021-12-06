import { IAppAction } from '../../types/globals';
import { actionTypes } from './actions';

type MetricInfo = {
  at: number;
  unit: string;
  value: number;
};

interface IMetricReducerState {
  latestMetricInfo: Map<string, MetricInfo>;
  dataStream: Map<number, { [key: string]: number }>;
}

const initialState: IMetricReducerState = {
  latestMetricInfo: new Map(),
  dataStream: new Map(),
};

const metricReducer = (state = initialState, action: IAppAction) => {
  switch (action.type) {
    case actionTypes.GET_METRICS_DATA_SUCCESS: {
      const { metric, ...rest } = action.payload;
      state = { ...state };
      state.latestMetricInfo = new Map(state.latestMetricInfo);
      state.dataStream = new Map(state.dataStream);

      state.latestMetricInfo.set(metric, rest);
      let { at } = rest;
      at = Math.floor(at / 1000) * 1000;
      const details: { [key: string]: number } = state.dataStream.get(at) || {
        name: at.toString(),
      };
      // at = getFormattedTime(at);
      details[metric] = rest.value;
      state.dataStream.set(at, details);
      break;
    }
    default:
      break;
  }
  return state;
};

export default metricReducer;
