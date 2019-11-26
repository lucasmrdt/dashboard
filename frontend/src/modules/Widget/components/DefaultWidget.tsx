import React from 'react';
import JSONPretty from 'react-json-pretty';

import { WidgetImplementation } from '../types';

interface Data {}

const DefaultWidget: WidgetImplementation<Data> = ({ params, data }) => (
  <>
    <JSONPretty data={data} />
  </>
);

export default DefaultWidget;
