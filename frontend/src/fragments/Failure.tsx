import React from 'react';
import { Icon } from 'antd';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
});

const Failure = () => <Icon className={css(styles.icon)} type={'robot'} />;

export default React.memo(Failure);
