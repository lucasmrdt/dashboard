import React, { useMemo, useCallback } from 'react';
import { Menu, Icon } from 'antd';
import { css, StyleSheet } from 'aphrodite';
import Failure from 'fragments/Failure';
import Loading from 'fragments/Loading';

import { Service } from '../types';
import { Status } from 'types/Status';

const { SubMenu } = Menu;

const styles = StyleSheet.create({
  // container: {
  //   position: 'absolute',
  //   left: 0,
  //   height: '100%',
  // },
  container: {
    height: '100%',
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
});

export interface StateProps {
  services: Service[];
  status: Status;
}

export interface DispatchProps {
  subscribeToWidget: (serviceName: string, widgetName: string) => any;
}

type Props = StateProps & DispatchProps;

const ServiceSidebar = ({ services, status, subscribeToWidget }: Props) => {
  const setupOnClick = (serviceName: string, widgetName: string) => () =>
    subscribeToWidget(serviceName, widgetName);

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
              onClick={setupOnClick(service.name, widget.name)}
              key={widget.name}
            >
              <Icon type={'plus'} />
              <span style={{ margin: 0 }}>{widget.name.replace('_', ' ')}</span>
            </Menu.Item>
          ))}
        </SubMenu>
      )),
    [services, setupOnClick]
  );

  return (
    <Menu
      mode={'inline'}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={styles.container}
    >
      {status === Status.loading && <Loading />}
      {status === Status.failed && <Failure />}
      {status === Status.success && success}
    </Menu>
  );
};

export default ServiceSidebar;
