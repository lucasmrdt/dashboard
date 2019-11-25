import { connect } from 'react-redux';
import ConnectForm from 'modules/Auth/components/ConnectForm';
import { authWithCredential, authWithToken } from 'modules/Auth/actions';

import { DispatchProps, StateProps } from 'modules/Auth/components/ConnectForm';
import { State } from 'types/Redux';

const mapStateToProps = (state: State): StateProps => ({
  status: state.authState.status,
});

const mapDispatchToProps: DispatchProps = {
  connectWithToken: authWithToken,
  connectWithCredential: authWithCredential,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectForm);
