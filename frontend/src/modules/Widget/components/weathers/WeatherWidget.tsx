/* eslint-disable react/display-name */
import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import CitySelect from 'fragments/CitySelect';

import { WidgetImplementation, OptionHOC } from '../../types';

export const WEATHER_OPTIONS: { [key: string]: OptionHOC } = {
  city: (updater, params) => (
    <CitySelect
      defaultValue={params.city}
      style={{ width: 200 }}
      onChange={value => updater('city', value)}
    />
  ),
};

const styles = StyleSheet.create({
  icon: {
    userSelect: 'none',
  },
});

interface Data {
  icon: string;
}

interface Params {
  city: string;
}

export const WeatherWidget: WidgetImplementation<Data, Params> = ({ params, data }) => (
  <>
    <p>{params.city}</p>
    <img draggable={false} className={css(styles.icon)} alt={'weather'} src={data.icon} />
  </>
);
