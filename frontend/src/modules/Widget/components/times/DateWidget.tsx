/* eslint-disable react/display-name */
import React from 'react';
import TimezoneSelect from 'fragments/TimezoneSelect';

import { WidgetImplementation, OptionHOC } from '../../types';
import moment from 'moment';

export const DATE_OPTIONS: { [key: string]: OptionHOC } = {
  timezone: (updater, params) => (
    <TimezoneSelect
      defaultValue={params.timezone}
      style={{ width: 200 }}
      onChange={value => updater('timezone', value)}
    />
  ),
};

interface Data {
  time: string;
}

interface Params {
  timezone: string;
}

export const DateWidget: WidgetImplementation<Data, Params> = ({ params, data }) => (
  <>
    <p>{params.timezone}</p>
    <h1>{moment(data.time).format('DD MMMM YYYY')}</h1>
  </>
);
