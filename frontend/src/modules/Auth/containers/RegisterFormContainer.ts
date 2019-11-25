import { connect } from 'react-redux';
import RegisterForm from 'modules/Auth/components/RegisterForm';
import { registerWithCredential, registerWithToken } from 'modules/Auth/actions';

import { DispatchProps, StateProps } from 'modules/Auth/components/RegisterForm';
import { State } from 'types/Redux';

const mapStateToProps = (state: State): StateProps => ({
  status: state.authState.status,
});

const mapDispatchToProps: DispatchProps = {
  registerWithToken,
  registerWithCredential,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
