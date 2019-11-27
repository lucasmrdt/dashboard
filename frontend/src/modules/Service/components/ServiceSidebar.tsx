import React, { useMemo, useCallback } from 'react';
import { Menu, Icon, Badge, Tooltip, Button } from 'antd';
import firebase from 'firebase';
import { StyleSheet, css } from 'aphrodite';
import { useHistory } from 'react-router';
import Failure from 'fragments/Failure';
import Loading from 'fragments/Loading';

import { Status } from 'types/Status';
import { Service } from '../types';

const { SubMenu } = Menu;

const GITHUB_PROVIDER = new firebase.auth.GithubAuthProvider().addScope('user repo');

const PROVIDER_BY_SERVICES: { [key: string]: firebase.auth.AuthProvider } = {
  github: GITHUB_PROVIDER,
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    background: 'white',
    borderRight: 0,
    paddingTop: 70,
    userSelect: 'none',
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
  disconnect: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: 'translateX(-50%)',
  },
  title: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    top: 30,
  },
});

export interface StateProps {
  services: Service[];
  status: Status;
  counterByWidgetName: { [key: string]: number };
}

export interface DispatchProps {
  subscribeToWidget: (serviceName: string, widgetName: string) => any;
  setTokenToService: (serviceName: string, token: string) => any;
  disconnect: () => any;
}

type Props = StateProps & DispatchProps;

const ServiceSidebar = ({
  services,
  status,
  subscribeToWidget,
  counterByWidgetName,
  setTokenToService,
  disconnect,
}: Props) => {
  const history = useHistory();

  const onDisconnect = useCallback(() => {
    history.push('/');
    disconnect();
  }, [disconnect, history]);

  const authService = useCallback(
    (serviceName: string) => async () => {
      const provider = PROVIDER_BY_SERVICES[serviceName];
      if (!provider) {
        return console.error(`undefined provider for service '${serviceName}'`);
      }
      const result = await firebase.auth().signInWithPopup(provider);
      if (!result.credential) {
        return console.error(`unfound token for service '${serviceName}'`);
      }
      setTokenToService(serviceName, (result.credential as any).accessToken);
    },
    [setTokenToService]
  );

  const setupOnClick = useCallback(
    (serviceName: string, widgetName: string) => () =>
      subscribeToWidget(serviceName, widgetName),
    [subscribeToWidget]
  );

  const success = useMemo(
    () =>
      services.map(service =>
        service.locked ? (
          <Menu.Item onClick={authService(service.name)}>
            <Icon type={'lock'} /> {service.name}
          </Menu.Item>
        ) : (
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
                  {counterByWidgetName[widget.name] ? (
                    <Badge count={counterByWidgetName[widget.name]} />
                  ) : (
                    <Icon type={widget.icon} />
                  )}
                  <span className={css(styles.label)}>
                    {widget.name.replace('_', ' ')}
                  </span>
                </Tooltip>
              </Menu.Item>
            ))}
          </SubMenu>
        )
      ),
    [services, setupOnClick, counterByWidgetName, authService]
  );

  return (
    <Menu mode={'inline'} className={css(styles.container)}>
      <h1 className={css(styles.title)}>Dashboard!</h1>
      {status === Status.loading && <Loading />}
      {status === Status.failed && <Failure />}
      {status === Status.success && success}
      <div>
        <Button className={css(styles.disconnect)} onClick={onDisconnect}>
          disconnect
        </Button>
      </div>
    </Menu>
  );
};

// @ts-ignore
export default ServiceSidebar;
