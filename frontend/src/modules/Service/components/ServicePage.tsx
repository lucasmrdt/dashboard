import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Layout } from 'antd';
import ServiceSidebarContainer from '../containers/ServiceSidebarContainer';
import WidgetListContainer from 'modules/Widget/containers/WidgetListContainer';

const { Sider, Content } = Layout;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  form: {
    maxWidth: 300,
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formButton: {
    width: '100%',
  },
  sider: {
    height: '100%',
  },
});

const ServicePage = () => {
  return (
    <Layout className={css(styles.container)}>
      <Sider className={css(styles.sider)}>
        <ServiceSidebarContainer />
      </Sider>
      <Content>
        <WidgetListContainer />
      </Content>
    </Layout>
  );
};

export default ServicePage;
