import React, { useMemo, useCallback } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Link, Redirect } from 'react-router-dom';
import { Spin, Row, Col } from 'antd';
import FacebookButton from './FacebookButton';
import CredentialForm from './CredentialForm';
import { CONNECT_PATH } from 'modules/Auth/constants/authRoutes';
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
});

export interface StateProps {
  status: Status;
}

export interface DispatchProps {
  registerWithToken: (email: string, name: string, token: string) => void;
  registerWithCredential: (email: string, name: string, password: string) => void;
}

type Props = StateProps & DispatchProps;

const AuthForm = ({ status, registerWithToken, registerWithCredential }: Props) => {
  const onCredentialSubmit = useCallback(
    (response: AuthResponse) =>
      registerWithCredential(
        response.email,
        response.name as string,
        response.password as string
      ),
    [registerWithCredential]
  );

  const onOAuthSubmit = useCallback(
    (response: AuthResponse) =>
      registerWithToken(
        response.email,
        response.name as string,
        response.token as string
      ),
    [registerWithToken]
  );

  const Loading = useMemo(() => <Spin />, []);
  const Default = useMemo(
    () => (
      <div>
        <Row>
          <CredentialForm isRegistering onResponse={onCredentialSubmit} />
        </Row>
        <Row>
          <Col span={12} className={css(styles.center)}>
            <FacebookButton onResponse={onOAuthSubmit} />
          </Col>
          <Col span={12} className={css(styles.center)}>
            <FacebookButton onResponse={onOAuthSubmit} />
          </Col>
        </Row>
        <Row>
          <p>
            Already have an account? <Link to={CONNECT_PATH}>Connect now!</Link>
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
