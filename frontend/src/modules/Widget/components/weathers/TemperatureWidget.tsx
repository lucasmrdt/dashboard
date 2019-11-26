/* eslint-disable react/display-name */
import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import CitySelect from 'fragments/CitySelect';

import { WidgetImplementation, OptionHOC } from '../../types';

export const TEMPERATURE_OPTIONS: { [key: string]: OptionHOC } = {
  city: (updater, params) => (
    <CitySelect
      defaultValue={params.city}
      style={{ width: 200 }}
      onChange={value => updater('city', value)}
    />
  ),
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    fontSize: 40,
  },
  label: {
    fontSize: 13,
    color: 'grey',
  },
  minLabel: {
    color: 'blue',
    padding: 5,
  },
  maxLabel: {
    color: 'red',
    padding: 5,
  },
});

interface Data {
  current: number;
  min: number;
  max: number;
}

interface Params {
  city: string;
}

const kelvinToCelsius = (deg: number) => deg - 273.15;

export const TemperatureWidget: WidgetImplementation<Data, Params> = ({
  params,
  data,
}) => (
  <div className={css(styles.container)}>
    <p>{params.city}</p>
    <h1 className={css(styles.title)}>{kelvinToCelsius(data.current).toFixed(1)} °</h1>
    <div>
      <h2 className={css(styles.label)}>
        min
        <span className={css(styles.minLabel)}>
          {kelvinToCelsius(data.min).toFixed(1)} °
        </span>
        {'max'}
        <span className={css(styles.maxLabel)}>
          {kelvinToCelsius(data.max).toFixed(1)} °
        </span>
      </h2>
    </div>
  </div>
);
