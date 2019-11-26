import React, { useMemo, useCallback } from 'react';
import { Menu, Icon, Badge, Tooltip } from 'antd';
import { StyleSheet, css } from 'aphrodite';
import Failure from 'fragments/Failure';
import Loading from 'fragments/Loading';

import { Service } from '../types';
import { Status } from 'types/Status';

const { SubMenu } = Menu;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: 300,
    borderRight: 0,
  },
  submenuContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    borderWidth: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    marginLeft: 10,
  },
});

export interface StateProps {
  services: Service[];
  status: Status;
  counterByWidgetName: { [key: string]: number };
}

export interface DispatchProps {
  subscribeToWidget: (serviceName: string, widgetName: string) => any;
}

type Props = StateProps & DispatchProps;

const ServiceSidebar = ({
  services,
  status,
  subscribeToWidget,
  counterByWidgetName,
}: Props) => {
  const setupOnClick = useCallback(
    (serviceName: string, widgetName: string) => () =>
      subscribeToWidget(serviceName, widgetName),
    [subscribeToWidget]
  );

  const success = useMemo(
    () =>
      services.map(service => (
        <SubMenu
          key={service.name}
          title={
            <span>
              <Icon type={service.icon} />
              {service.name}
            </span>
          }
        >
          {service.widgets.map(widget => (
            <Menu.Item
              key={widget.name}
              onClick={setupOnClick(service.name, widget.name)}
            >
              <Tooltip placement="right" title={widget.description}>
                <Badge showZero count={counterByWidgetName[widget.name] || 0} />
                <span className={css(styles.label)}>{widget.name.replace('_', ' ')}</span>
              </Tooltip>
            </Menu.Item>
          ))}
        </SubMenu>
      )),
    [services, setupOnClick, counterByWidgetName]
  );

  return (
    <Menu mode={'inline'} style={styles.container}>
      {status === Status.loading && <Loading />}
      {status === Status.failed && <Failure />}
      {status === Status.success && success}
    </Menu>
  );
};

export default ServiceSidebar;
