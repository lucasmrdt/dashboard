import React, { useCallback } from 'react';
import FacebookLogin from 'react-facebook-login';
import { StyleSheet, css } from 'aphrodite';

import { AuthResponse } from 'modules/Auth/types';
import { ReactFacebookLoginInfo } from 'react-facebook-login';

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type Props = {
  onResponse: (response: AuthResponse) => any;
};

const FacebookButton = ({ onResponse }: Props) => {
  const callback = useCallback(
    (response: ReactFacebookLoginInfo) => {
      onResponse({
        token: response.id, // ☹️ tired ...
        email: response.email as string,
        name: response.name,
      });
    },
    [onResponse]
  );

  return (
    <div className={css(styles.button)}>
      <FacebookLogin
        appId="445843112741245"
        fields="name,email,picture"
        textButton={''}
        icon="fa-facebook"
        callback={callback}
      />
    </div>
  );
};

export default React.memo<Props>(FacebookButton);
