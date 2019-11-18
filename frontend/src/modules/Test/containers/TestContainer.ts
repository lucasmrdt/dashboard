import {connect} from 'react-redux';
import Test from 'modules/Test/components/Test';
import {test} from 'modules/Test/testActions';

import {DispatchProps, StateProps} from 'modules/Test/components/Test';
import {State} from 'types/Redux';

const mapStateToProps = (state: State): StateProps => ({
  status: state.testState.status,
});

const mapDispatchToProps: DispatchProps = {
  launchTest: test,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Test);
