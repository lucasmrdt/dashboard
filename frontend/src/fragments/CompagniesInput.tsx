import React from 'react';
import { AutoComplete } from 'antd';
import compagnies from 'constants/compagnies.json';

import { AutoCompleteProps } from 'antd/lib/auto-complete';

type Props = AutoCompleteProps;

const CompagniesInput = (props: Props) => (
  <AutoComplete dataSource={compagnies} {...props} />
);

export default React.memo<Props>(CompagniesInput);
