import React, { useEffect } from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Filters from '../../Features/Filters';
import { getMetricsData } from '../../redux/metric/actions';
import Tiles from '../../Features/Tiles';
import Chart from '../../Features/Chart';
import { IAppState } from '../../redux/root-reducer';

const useStyles = makeStyles({
  grid: {
    padding: 16,
    margin: '16px auto 0',
    minHeight: 'calc(100vh - 96px)',
    background: '#ffffff',
    flex: 1,
    maxWidth: 'calc(100% - 32px)',
  },
});

const Dashboard: React.FC = () => {
  const selectedMetrics = useSelector(({ filters }: IAppState) => filters.selectedMetrics);
  const dispatch = useDispatch();
  const classes = useStyles();
  // On Mount, start fetching the Metrics Info
  useEffect(() => {
    dispatch(getMetricsData());
  }, []);
  // Only render the Chart if metrics are selected
  return (
    <Grid item xs={8} className={classes.grid}>
      <Filters />
      <Tiles />
      {selectedMetrics.length ? <Chart /> : null}
    </Grid>
  );
};

export default Dashboard;
