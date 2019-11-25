import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, Spin, Dropdown, Menu, Button, Icon, InputNumber, Popover } from 'antd';
import { StyleSheet, css } from 'aphrodite';
import Failure from 'fragments/Failure';
import DefaultWidget from './DefaultWidget';
import * as widgetApi from '../api';

import { Status } from 'types/Status';
import { Response } from 'types/Api';
import { Widget, WidgetImplementation, DefaultParams } from '../types';

const WIDGET_BY_NAMES: { [key: string]: WidgetImplementation } = {};

const BODY_STYLE = {
  overflow: 'scroll',
  maxHeight: 'calc(100% - 60px)',
};

const styles = StyleSheet.create({
  dropdown: {
    marginLeft: 10,
    cursor: 'pointer',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownContent: {
    display: 'flex',
    flexDirection: 'column',
    border: 'none',
  },
  dropdownContentChild: {
    width: 70,
    marginLeft: 10,
  },
});

export interface StateProps {
  widget: Widget;
}

type Props = StateProps & { [key: string]: any };

const WidgetComponent = ({ widget, ...props }: Props) => {
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState<Status>(Status.default);
  const [params, setParams] = useState<DefaultParams>(widget.params as DefaultParams);

  const Component: WidgetImplementation = WIDGET_BY_NAMES[widget.name] || DefaultWidget;

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
    const data = await callApi(widgetApi.getWidgetData, widget._id);
    data && setData(data);
    setTimeout(refreshData, params.refreshInterval);
  }, [params.refreshInterval, widget, setData]);

  const updateParams = useCallback(
    async (newParams: any) => {
      const data = await callApi(widgetApi.updateWidgetParams, widget._id, newParams);
      data && setParams(data);
    },
    [widget, setParams, setStatus]
  );

  const dropdownMenu = useMemo(
    () => (
      <Menu className={css(styles.dropdownContent)}>
        <Menu.Item className={css(styles.itemContainer)}>
          <Icon type="delete" /> remove
        </Menu.Item>
        <div className={css(styles.itemContainer)}>
          <Icon type="clock-circle" />
          <InputNumber
            className={css(styles.dropdownContentChild)}
            defaultValue={3}
            min={1}
            max={30}
            formatter={value => `${value} s`}
            parser={(value: any) => value.match(/[0-9]+/)}
            onChange={console.log}
          />
        </div>
      </Menu>
    ),
    []
  );

  const dropdown = useMemo(
    () => (
      <Popover
        // trigger={['click']}
        className={css(styles.dropdown)}
        content={dropdownMenu}
      >
        <Icon type="setting" />
      </Popover>
    ),
    []
  );

  const extra = useMemo(
    () => (
      <>
        {status === Status.loading && <Spin size={'small'} />}
        {dropdown}
      </>
    ),
    [status, dropdown]
  );

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  if (status === Status.failed) {
    return <Failure />;
  }

  return (
    <Card
      {...props}
      onMouseMove={e => e.stopPropagation()}
      bodyStyle={BODY_STYLE}
      title={widget.name.replace(/_/, ' ').toUpperCase()}
      loading={data === null && status === Status.loading}
      extra={extra}
    >
      <Component
        params={params}
        widget={widget}
        data={data}
        updateParams={updateParams}
      />
      {props.children}
    </Card>
  );
};

export default WidgetComponent;
