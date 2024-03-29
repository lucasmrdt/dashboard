import _ from 'lodash';
import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Card, Spin, Menu, Icon, InputNumber, Popover } from 'antd';
import { StyleSheet, css } from 'aphrodite';
import Failure from 'fragments/Failure';
import DefaultWidget from './DefaultWidget';
import * as widgetApi from '../api';
import { TemperatureWidget, TEMPERATURE_OPTIONS } from './weathers/TemperatureWidget';
import { WeatherWidget, WEATHER_OPTIONS } from './weathers/WeatherWidget';
import { WindWidget, WIND_OPTIONS } from './weathers/WindWidget';
import { PriceWidget, PRICE_OPTIONS } from './stocks/PriceWidget';
import { InformationWidget, INFORMATION_OPTIONS } from './stocks/InformationWidget';
import { ClockWidget, CLOCK_OPTIONS } from './times/ClockWidget';
import { DateWidget, DATE_OPTIONS } from './times/DateWidget';
import { ProfileWidget } from './github/ProfileWidget';
import { RepositoryWidget, REPOSITORY_OPTIONS } from './github/RepositoryWidget';

import { Status } from 'types/Status';
import { Response } from 'types/Api';
import { Widget, WidgetImplementation, DefaultParams, OptionHOC } from '../types';

const WIDGET_BY_NAMES: {
  [key: string]: [WidgetImplementation, { [key: string]: OptionHOC }];
} = {
  temperature: [TemperatureWidget, TEMPERATURE_OPTIONS],
  weather: [WeatherWidget, WEATHER_OPTIONS],
  wind: [WindWidget, WIND_OPTIONS],
  price: [PriceWidget, PRICE_OPTIONS],
  information: [InformationWidget, INFORMATION_OPTIONS],
  clock: [ClockWidget, CLOCK_OPTIONS],
  date: [DateWidget, DATE_OPTIONS],
  profile: [ProfileWidget, {}],
  repository: [RepositoryWidget, REPOSITORY_OPTIONS],
};

const DEFAULT_OPTIONS: { [key: string]: OptionHOC } = {
  // eslint-disable-next-line react/display-name
  refreshInterval: (updater, params) => (
    <>
      <Icon type="clock-circle" />
      <InputNumber
        className={css(styles.dropdownContentChild)}
        defaultValue={params.refreshInterval}
        min={1}
        max={30}
        formatter={value => `${value} s`}
        parser={(value: any) => value.match(/[0-9]+/)}
        onChange={value => updater('refreshInterval', value)}
      />
    </>
  ),
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  dropdown: {
    marginLeft: 10,
    cursor: 'pointer',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    marginBottom: 20,
  },
  dropdownContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: 'none',
  },
  dropdownContentChild: {
    width: 70,
    marginLeft: 10,
  },
  extraContainer: {
    height: 20,
    position: 'fixed',
    top: 10,
    right: 10,
    zIndex: 100,
  },
  componentContainer: {
    overflow: 'scroll',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 40,
    width: '100%',
    height: '100%',
  },
  icon: {
    height: 20,
    position: 'fixed',
    top: 10,
    left: 10,
  },
});

export interface DispatchProps {
  removeWidget: (widgetId: string) => any;
}

type Props = {
  widget: Widget;
} & DispatchProps & { [key: string]: any };

const WidgetComponent = ({ widget, removeWidget }: Props) => {
  const timeoutId = useRef<any>(null);
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState<Status>(Status.default);
  const [params, setParams] = useState<DefaultParams>(widget.params as DefaultParams);

  const [Component, componentOptions] = WIDGET_BY_NAMES[widget.name] || [
    DefaultWidget,
    {},
  ];
  const options = { ...DEFAULT_OPTIONS, ...componentOptions };

  const callApi = useCallback(
    async (api: (...args: any[]) => Promise<Response<any>>, ...args) => {
      setStatus(Status.loading);
      try {
        const res = await api(...args);
        if (res.success) {
          setStatus(Status.success);
          return res.data;
        }
        setStatus(Status.failed);
      } catch {
        setStatus(Status.failed);
      }
      return null;
    },
    [setStatus]
  );

  const refreshData = useCallback(async () => {
    clearTimeout(timeoutId.current);
    const data = await callApi(widgetApi.getWidgetData, widget.id);
    data && setData(data);
    timeoutId.current = setTimeout(refreshData, params.refreshInterval * 1000);
  }, [params, widget, setData, callApi]);

  const updateParams = useCallback(
    _.throttle(async (key: string, value: any) => {
      const newParams = { ...params, [key]: value };
      const data = await callApi(widgetApi.updateWidgetParams, widget.id, newParams);
      data && setParams(data);
    }, 1000),
    [params, setParams, callApi]
  );

  const deleteWidget = useCallback(() => {
    removeWidget(widget.id);
  }, [widget.id, removeWidget]);

  const dropdownMenu = useMemo(
    () => (
      <Menu className={css(styles.dropdownContent)}>
        <Menu.Item onClick={deleteWidget}>
          <Icon type="delete" /> remove
        </Menu.Item>
        {_.map(options, (hoc, key) => (
          <div key={key} className={css(styles.itemContainer)}>
            {hoc(updateParams, params, data)}
          </div>
        ))}
      </Menu>
    ),
    [deleteWidget, params, options, data, updateParams]
  );

  const dropdown = useMemo(
    () => (
      <Popover className={css(styles.dropdown)} content={dropdownMenu}>
        <Icon type="setting" />
      </Popover>
    ),
    [dropdownMenu]
  );

  const header = useMemo(
    () => (
      <>
        <Icon className={css(styles.icon)} type={widget.icon} />
        <div className={css(styles.extraContainer)}>
          {status === Status.loading && <Spin size={'small'} />}
          {dropdown}
        </div>
      </>
    ),
    [status, dropdown, widget]
  );

  useEffect(() => {
    refreshData();
    return () => clearTimeout(timeoutId.current);
  }, [refreshData]);

  return (
    <Card
      className={css(styles.container)}
      loading={data === null && status === Status.loading}
    >
      {header}
      {status === Status.failed ? (
        <Failure />
      ) : (
        data && (
          <div className={css(styles.componentContainer)}>
            <Component params={params} data={data} />
          </div>
        )
      )}
    </Card>
  );
};

export default React.memo<Props>(WidgetComponent);
