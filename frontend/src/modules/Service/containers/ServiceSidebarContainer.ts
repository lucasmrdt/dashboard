import { connect } from 'react-redux';
import ServiceSidebar from '../components/ServiceSidebar';
import { subscribeToWidget } from 'modules/Widget/actions';

import { StateProps, DispatchProps } from 'modules/Service/components/ServiceSidebar';
import { State } from 'types/Redux';

const mapStateToProps = (state: State): StateProps => ({
  status: state.serviceState.status,
  services: state.serviceState.services,
});

const mapDispatchToProps: DispatchProps = {
  subscribeToWidget,
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceSidebar);
