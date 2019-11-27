import React, { useEffect, useMemo } from 'react';
import { Spin, Icon } from 'antd';
import { useLocalStorage } from 'hooks';
import { Responsive, WidthProvider } from 'react-grid-layout';
import WidgetContainer from '../containers/WidgetContainer';

import { Status } from 'types/Status';
import { Widget } from '../types';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const COLS = { lg: 6, md: 4, sm: 4, xs: 2, xxs: 2 };

export interface StateProps {
  widgets: Widget[];
  status: Status;
}

export interface DispatchProps {
  getWidgets: () => any;
}

type Props = StateProps & DispatchProps;

const WidgetList = ({ widgets, status, getWidgets }: Props) => {
  const [layouts, setLayouts] = useLocalStorage('widgets-layout', {});

  const success = useMemo(
    () => (
      <ResponsiveReactGridLayout
        rowHeight={200}
        layouts={layouts}
        onLayoutChange={(_, layouts) => setLayouts(layouts)}
        cols={COLS}
      >
        {widgets.map(widget => (
          <div style={{ overflow: 'scroll' }} key={widget.id}>
            <WidgetContainer widget={widget} />
          </div>
        ))}
      </ResponsiveReactGridLayout>
    ),
    [widgets, layouts, setLayouts]
  );
  const loading = useMemo(() => <Spin />, []);
  const failure = useMemo(() => <Icon type={'robot'} />, []);

  useEffect(() => {
    getWidgets();
  }, [getWidgets]);

  switch (status) {
    case Status.success:
      return success;
    case Status.failed:
      return failure;
    default:
      return loading;
  }
};

export default WidgetList;
