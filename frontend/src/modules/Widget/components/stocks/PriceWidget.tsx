/* eslint-disable react/display-name */
import React from 'react';
import { Icon, Select } from 'antd';
import compagnies from 'constants/compagnies.json';

import { WidgetImplementation, OptionHOC } from '../../types';

const { Option } = Select;

export const PRICE_OPTIONS: { [key: string]: OptionHOC } = {
  compagny: (updater, params) => (
    <Select
      defaultValue={params.compagny}
      style={{ width: 200 }}
      onChange={(value: any) => updater('compagny', value)}
    >
      {compagnies.map(compagny => (
        <Option key={compagny.value} value={compagny.value}>
          {compagny.text}
        </Option>
      ))}
    </Select>
  ),
};

const getCompagnyNameFromId = (name: string) =>
  compagnies.find(({ value }) => value === name)!;

interface Data {
  ask: number;
  bid: number;
}

interface Params {
  compagny: string;
}

export const PriceWidget: WidgetImplementation<Data, Params> = ({ params, data }) => (
  <>
    <h1>
      {getCompagnyNameFromId(params.compagny).text} ({params.compagny})
    </h1>
    <div>
      <Icon type="caret-down" />
      <span> {data.ask.toFixed(2)}</span>
    </div>
    <div>
      <Icon type="caret-up" />
      <span> {data.bid.toFixed(2)}</span>
    </div>
  </>
);
