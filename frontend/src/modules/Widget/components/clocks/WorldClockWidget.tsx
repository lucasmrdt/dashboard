/* eslint-disable react/display-name */
import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Icon } from 'antd';
import TimezoneSelect from 'fragments/TimezoneSelect';

import { WidgetImplementation, OptionHOC } from '../../types';

export const WORLD_CLOCK_OPTIONS: { [key: string]: OptionHOC } = {
  timezone: (updater, params) => (
    <TimezoneSelect
      defaultValue={params.timezone}
      style={{ width: 200 }}
      onChange={value => updater('timezone', value)}
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
  time: number;
}

interface Params {
  timezone: string;
}

export const WorldClockWidget: WidgetImplementation<Data, Params> = ({ params, data }) => (
  <div className={css(styles.container)}>
    <p>{params.timezone}</p>
    <h1 className={css(styles.title)}>
      {data.time}
    </h1>
  </div>
);
