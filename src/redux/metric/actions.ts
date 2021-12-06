import { gql } from '@apollo/client';
import { apolloClient } from '../../constants';

export const actionTypes = {
  GET_METRICS_DATA_INIT: 'GET_METRICS_DATA_INIT',
  GET_METRICS_DATA_SUCCESS: 'GET_METRICS_DATA_SUCCESS',
};

// Metric data handled vai apollocient subscription
export const getMetricsData = () => async (dispatch: any) => {
  dispatch({ type: actionTypes.GET_METRICS_DATA_INIT });
  const request = apolloClient.subscribe({
    query: gql`
      subscription {
        metricInfo: newMeasurement {
          metric
          at
          value
          unit
        }
      }
    `,
  });
  request.subscribe({
    next({ data }) {
      dispatch({ type: actionTypes.GET_METRICS_DATA_SUCCESS, payload: data.metricInfo });
    },
  });
};
