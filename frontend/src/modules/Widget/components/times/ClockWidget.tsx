/* eslint-disable react/display-name */
import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import TimezoneSelect from 'fragments/TimezoneSelect';

import { WidgetImplementation, OptionHOC } from '../../types';
import moment from 'moment';

export const CLOCK_OPTIONS: { [key: string]: OptionHOC } = {
  timezone: (updater, params) => (
    <TimezoneSelect
      defaultValue={params.timezone}
      style={{ width: 200 }}
      onChange={value => updater('timezone', value)}
    />
  ),
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
  },
});

interface Data {
  time: string;
}

interface Params {
  timezone: string;
}

export const ClockWidget: WidgetImplementation<Data, Params> = ({ params, data }) => (
  <>
    <p>{params.timezone}</p>
    <h1 className={css(styles.title)}>{moment(data.time).format('HH:mm')}</h1>
  </>
);
