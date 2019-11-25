import React from 'react';
import { Card } from 'antd';
import JSONPretty from 'react-json-pretty';

import { WidgetImplementation } from '../types';

interface Data {}

const DefaultWidget: WidgetImplementation<Data> = ({
  params,
  widget,
  data,
  updateParams,
}) => (
  <>
    <h1>{widget.name}</h1>
    <p>{widget.description}</p>
    <JSONPretty data={data} />
  </>
);

export default DefaultWidget;
