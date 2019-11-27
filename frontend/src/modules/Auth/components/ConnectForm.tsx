import React, { useMemo, useCallback } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link, Redirect } from 'react-router-dom';
import { Spin, Row, Col } from 'antd';
import FacebookButton from './FacebookButton';
import CredentialForm from './CredentialForm';
import { REGISTER_PATH } from 'modules/Auth/constants/authRoutes';
import { SERVICE_PATH } from 'modules/Service/constants/serviceRoutes';

import { Status } from 'types/Status';
import { AuthResponse } from 'modules/Auth/types';

const styles = StyleSheet.create({
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
  register: {
    marginTop: 20,
  },
});

export interface StateProps {
  status: Status;
}

export interface DispatchProps {
  connectWithToken: (token: string) => void;
  connectWithCredential: (email: string, password: string) => void;
}

type Props = StateProps & DispatchProps;

const AuthForm = ({ status, connectWithToken, connectWithCredential }: Props) => {
  const onCredentialSubmit = useCallback(
    (response: AuthResponse) =>
      connectWithCredential(response.email, response.password as string),
    [connectWithCredential]
  );

  const onOAuthSubmit = useCallback(
    (response: AuthResponse) => connectWithToken(response.token as string),
    [connectWithToken]
  );

  const Loading = useMemo(() => <Spin />, []);
  const Default = useMemo(
    () => (
      <div>
        <Row>
          <CredentialForm onResponse={onCredentialSubmit} />
        </Row>
        <Row>
          <Col span={24} className={css(styles.center)}>
            <FacebookButton onResponse={onOAuthSubmit} />
          </Col>
        </Row>
        <Row>
          <p className={css(styles.register)}>
            No account yet? <Link to={REGISTER_PATH}>Register now!</Link>
          </p>
        </Row>
      </div>
    ),
    [onCredentialSubmit, onOAuthSubmit]
  );

  switch (status) {
    case Status.loading:
      return Loading;

    case Status.success:
      return <Redirect to={SERVICE_PATH} />;

    default:
      return Default;
  }
};

export default AuthForm;
