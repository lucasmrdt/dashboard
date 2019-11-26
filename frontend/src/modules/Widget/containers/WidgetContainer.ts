import { connect } from 'react-redux';
import Widget from '../components/Widget';
import { unsubscribeToWidget } from '../actions';

import { DispatchProps } from '../components/Widget';

const mapDispatchToProps: DispatchProps = {
  removeWidget: unsubscribeToWidget,
};

export default connect(null, mapDispatchToProps)(Widget);
