import { connect } from 'react-redux';
import ProtectedRoute from '../components/ProtectedRoute';

import { StateProps } from '../components/ProtectedRoute';
import { State } from 'types/Redux';
import { Status } from 'types/Status';

const mapStateToProps = (state: State): StateProps => ({
  isConnected: state.authState.status === Status.success,
});

export default connect(mapStateToProps)(ProtectedRoute);
