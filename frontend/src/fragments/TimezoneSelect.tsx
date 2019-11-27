import React from 'react';
import { Select } from 'antd';
import timezones from 'constants/timezone.json';

import { SelectProps } from 'antd/lib/select';

const { Option } = Select;

type Props = SelectProps;

const TimezoneSelect = (props: Props) => (
  <Select {...props}>
    {timezones.map(timezone => (
      <Option key={timezone} value={timezone}>
        {timezone}
      </Option>
    ))}
  </Select>
);

export default React.memo<Props>(TimezoneSelect);
