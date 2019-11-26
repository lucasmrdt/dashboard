import React from 'react';
import { Select } from 'antd';
import cities from 'constants/cities.json';

import { SelectProps } from 'antd/lib/select';

const { Option } = Select;

type Props = SelectProps;

const CitySelect = (props: Props) => (
  <Select {...props}>
    {cities.map(city => (
      <Option key={city} value={city}>
        {city}
      </Option>
    ))}
  </Select>
);

export default React.memo<Props>(CitySelect);
