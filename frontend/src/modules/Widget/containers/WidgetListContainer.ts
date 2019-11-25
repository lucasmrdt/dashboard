import { connect } from 'react-redux';
import WidgetList from '../components/WidgetList';
import { getWidgets } from '../actions';

import { StateProps, DispatchProps } from '../components/WidgetList';
import { State } from 'types/Redux';

const mapStateToProps = (state: State): StateProps => ({
  widgets: state.widgetState.widgets,
  status: state.widgetState.status,
});

const mapDispatchToProps: DispatchProps = {
  getWidgets,
};

export default connect(mapStateToProps, mapDispatchToProps)(WidgetList);
