import React from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, YAxis, CartesianGrid, Legend, ResponsiveContainer, XAxis } from 'recharts';
import { IAppState } from '../../redux/root-reducer';
import { getFormattedTime } from '../../utils/date-formatter';

// Color for each metric of the Chart
const metricColors = new Map(
  Object.entries({
    flareTemp: '#324789',
    waterTemp: '#239492',
    oilTemp: '#acbcba',
    injValveOpen: '#239884',
    tubingPressure: '#190290',
    casingPressure: '#384000',
  }),
);

const Chart = () => {
  const dataStream = useSelector((state: IAppState) => state.metrics.dataStream);

  const ticks = Array.from(dataStream.keys());
  const tickValues = Array.from(dataStream.values());

  // Getting the units as a map for the metrics
  const unitsMap = useSelector((state: IAppState) => {
    const values = Array.from(state.metrics.latestMetricInfo.values());
    const keys = Array.from(state.metrics.latestMetricInfo.keys());
    const o: { [key: string]: string } = {};
    values.forEach((v, i) => {
      o[keys[i]] = v.unit;
    });
    return o;
  });

  const selectedMetrics = useSelector((state: IAppState) => state.filters.selectedMetrics);

  return (
    <ResponsiveContainer height={500}>
      <LineChart data={tickValues} style={{ marginTop: '20px' }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          scale="time"
          ticks={ticks}
          type="number"
          interval="preserveStartEnd"
          tickFormatter={getFormattedTime}
          domain={[ticks[0], ticks[ticks.length - 1]]}
        />
        {selectedMetrics.map((metric) => (
          <YAxis key={metric} unit={unitsMap[metric]} yAxisId={`yaxis-${metric}`} orientation="left" />
        ))}
        {selectedMetrics.map((metric) => (
          <Line
            key={metric}
            unit={unitsMap[metric]}
            yAxisId={`yaxis-${metric}`}
            dataKey={metric}
            stroke={metricColors.get(metric)}
            activeDot={{ r: 8 }}
            dot={false}
          />
        ))}
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
