import { connect } from 'react-redux';
import ServiceSidebar from '../components/ServiceSidebar';
import { authService } from '../actions';
import { subscribeToWidget } from 'modules/Widget/actions';
import { disconnect } from 'modules/Auth/actions';

import { StateProps, DispatchProps } from 'modules/Service/components/ServiceSidebar';
import { State } from 'types/Redux';

const mapStateToProps = (state: State): StateProps => ({
  status: state.serviceState.status,
  services: state.serviceState.services,
  counterByWidgetName: state.widgetState.widgets.reduce<{ [key: string]: number }>(
    (acc, { name }) => ({ ...acc, [name]: (acc[name] || 0) + 1 }),
    {}
  ),
});

const mapDispatchToProps: DispatchProps = {
  subscribeToWidget,
  setTokenToService: authService,
  disconnect,
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceSidebar);
