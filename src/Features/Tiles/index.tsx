import React from 'react';
import { Box, Grid, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { IAppState } from '../../redux/root-reducer';

const useStyles = makeStyles({
  container: {
    padding: '12px',
    fontSize: '0.8em',
    border: '2px solid #eaeaea',
  },
  value: {
    margin: 0,
    fontSize: '1.4em',
    fontFamily: 'Roboto',
  },
});

const Tiles = () => {
  const metrics = useSelector((state: IAppState) => state.metrics.latestMetricInfo);
  const selectedMetrics = useSelector((state: IAppState) => state.filters.selectedMetrics);
  const classes = useStyles();

  return selectedMetrics.length ? (
    <Grid container spacing={2}>
      {selectedMetrics.map((metric) => (
        <Grid key={metric} item xs={4}>
          <Box className={classes.container}>
            <div>
              {metric} (in {metrics.get(metric)?.unit})
            </div>
            <div className={classes.value}>{metrics.get(metric)?.value || '--'}</div>
          </Box>
        </Grid>
      ))}
    </Grid>
  ) : null;
};

export default Tiles;
