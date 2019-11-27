/* eslint-disable react/display-name */
import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Select } from 'antd';
import compagnies from 'constants/compagnies.json';

import { WidgetImplementation, OptionHOC } from '../../types';

const { Option } = Select;

export const INFORMATION_OPTIONS: { [key: string]: OptionHOC } = {
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
  text: {
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
});

interface Data {
  name: string;
  stock_exchange: string;
  ceo: string;
  company_url: string;
}

interface Params {
  compagny: string;
}

export const InformationWidget: WidgetImplementation<Data, Params> = ({ params, data }) => (
  <div className={css(styles.container)}>
    <h1>{data.name}</h1>
    <p>{data.ceo}</p>
    <p>
      <a href={'https://' + data.company_url} target="_">{data.company_url}</a>
    </p>
  </div>
);
