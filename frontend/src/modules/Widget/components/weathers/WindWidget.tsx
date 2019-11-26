/* eslint-disable react/display-name */
import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Icon } from 'antd';
import CitySelect from 'fragments/CitySelect';

import { WidgetImplementation, OptionHOC } from '../../types';

export const WIND_OPTIONS: { [key: string]: OptionHOC } = {
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
  speed: number;
  deg: number;
}

interface Params {
  city: string;
}

const metterSecondToKilometerHour = (speed: number) => speed * 3.6;

export const WindWidget: WidgetImplementation<Data, Params> = ({ params, data }) => (
  <div className={css(styles.container)}>
    <p>{params.city}</p>
    <h1 className={css(styles.title)}>
      {metterSecondToKilometerHour(data.speed).toFixed(1)} km/h
    </h1>
    <div>
      <Icon type="compass" />
      <span> {data.deg || 0} °</span>
    </div>
  </div>
);
