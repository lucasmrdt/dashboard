import React, {useMemo} from 'react';
import {StyleSheet, css} from 'aphrodite';
import {Spin, Button} from 'antd';

import {Status} from 'types/Status';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export interface StateProps {
  status: Status;
}

export interface DispatchProps {
  launchTest: () => void;
}

type Props = StateProps & DispatchProps;

const Test = ({status, launchTest}: Props) => {
  const Default = useMemo(
    () => <Button onClick={launchTest}>launch</Button>,
    [launchTest],
  );
  const Loading = useMemo(() => <Spin />, []);
  const Success = useMemo(() => <p>success</p>, []);
  const Failed = useMemo(() => <p>failed</p>, []);

  console.log('render');

  return (
    <div className={css(styles.container)}>
      {status === 'default' && Default}
      {status === 'loading' && Loading}
      {status === 'success' && Success}
      {status === 'failed' && Failed}
    </div>
  );
};

export default Test;
