import React, { useCallback } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import { StyleSheet, css } from 'aphrodite';

import { FormComponentProps } from 'antd/lib/form';
import { AuthResponse } from 'modules/Auth/types';

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    color: 'rgba(0,0,0,.25)',
  },
  formButton: {
    width: '100%',
  },
});

type Props = {
  onResponse: (response: AuthResponse) => any;
  isRegistering?: boolean;
} & FormComponentProps;

const CredentialForm = ({ onResponse, isRegistering = false, form }: Props) => {
  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      const fields = form.getFieldsValue();
      onResponse(fields as AuthResponse);
      e.preventDefault();
    },
    [form, onResponse]
  );

  return (
    <Form onSubmit={onSubmit}>
      <Form.Item>
        {form.getFieldDecorator('email', {
          rules: [{ required: true, message: 'Please input your username!' }],
        })(
          <Input
            prefix={<Icon type={'user'} className={css(styles.input)} />}
            autoComplete={'username'}
            placeholder={'Username'}
          />
        )}
      </Form.Item>
      {isRegistering && (
        <Form.Item>
          {form.getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your name!' }],
          })(
            <Input
              prefix={<Icon type={'smile'} className={css(styles.input)} />}
              autoComplete={'name'}
              placeholder={'Name'}
            />
          )}
        </Form.Item>
      )}
      <Form.Item>
        {form.getFieldDecorator('password', {
          rules: [{ required: true, message: 'Please input your Password!' }],
        })(
          <Input
            prefix={<Icon type={'lock'} className={css(styles.input)} />}
            type={'password'}
            autoComplete={'current-password'}
            placeholder={'Password'}
          />
        )}
      </Form.Item>
      <Form.Item>
        <Button type={'primary'} htmlType={'submit'} className={css(styles.formButton)}>
          {isRegistering ? 'Register' : 'Log in'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Form.create<Props>({ name: 'normal_login' })(CredentialForm);
