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
  title: {
    fontSize: 40,
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
  <>
    <p>{params.city}</p>
    <h1 className={css(styles.title)}>
      {metterSecondToKilometerHour(data.speed).toFixed(1)} km/h
    </h1>
    <div>
      <Icon type="compass" />
      <span> {data.deg || 0} °</span>
    </div>
  </>
);
