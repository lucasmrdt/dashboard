import {
  ADD_WIDGET,
  GET_WIDGETS,
  GET_WIDGETS_SUCCESS,
  GET_WIDGETS_FAILURE,
  SUBSCRIBE_TO_WIDGET_SUCCESS,
  UNSUBSCRIBE_TO_WIDGET,
} from './actions';

import { Widget } from './types';
import { Action } from 'types/Redux';
import { Status } from 'types/Status';

export interface State {
  widgets: Widget[];
  status: Status;
}

const initialState: State = {
  widgets: [],
  status: Status.default,
};

const widgetReducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case SUBSCRIBE_TO_WIDGET_SUCCESS:
    case ADD_WIDGET: {
      const { widget } = action.payload;
      return {
        ...state,
        widgets: [...state.widgets, widget],
      };
    }

    case UNSUBSCRIBE_TO_WIDGET: {
      const { widgetId } = action.payload;
      return {
        ...state,
        widgets: state.widgets.filter(({ _id }) => _id !== widgetId),
      };
    }

    case GET_WIDGETS: {
      return {
        ...state,
        status: Status.loading,
      };
    }

    case GET_WIDGETS_SUCCESS: {
      const { widgets } = action.payload;
      return {
        ...state,
        widgets,
        status: Status.success,
      };
    }

    case GET_WIDGETS_FAILURE: {
      return {
        ...state,
        status: Status.failed,
      };
    }

    default:
      return state;
  }
};

export default widgetReducer;
