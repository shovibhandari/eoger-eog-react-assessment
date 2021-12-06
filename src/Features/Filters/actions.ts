import { gql } from '@apollo/client';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { apolloClient } from '../../constants';

export const actionTypes = {
  GET_METRICS_INIT: 'GET_METRICS_INIT',
  GET_METRICS_SUCCESS: 'GET_METRICS_SUCCESS',
  METRICS_FILTER_SELECTED: 'METRICS_FILTER_SELECTED',
};

type ThunkAppAction = ThunkAction<void, undefined, unknown, AnyAction>;

export const getMetrics = (): ThunkAppAction => async (dispatch: any) => {
  dispatch({ type: actionTypes.GET_METRICS_INIT });
  const { data } = await apolloClient.query({
    query: gql`
      {
        metrics: getMetrics
      }
    `,
  });
  dispatch({ type: actionTypes.GET_METRICS_SUCCESS, payload: data.metrics });
};

export const selectMetrics = (payload: string[]) => ({
  type: actionTypes.METRICS_FILTER_SELECTED,
  payload,
});
