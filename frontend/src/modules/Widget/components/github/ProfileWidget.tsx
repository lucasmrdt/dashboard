/* eslint-disable react/display-name */
import React from 'react';
import { Icon, Avatar } from 'antd';

import { WidgetImplementation } from '../../types';

interface Data {
  // eslint-disable-next-line camelcase
  avatar_url: string;
  name: string;
  location: string;
  bio: string;
}

interface Params {
  compagny: string;
}

export const ProfileWidget: WidgetImplementation<Data, Params> = ({ data }) => (
  <>
    <Avatar size={60} src={data.avatar_url} />
    <h1>{data.name}</h1>
    <div>
      <Icon type="environment" />
      <span> {data.location}</span>
    </div>
    <div>
      <Icon type="book" />
      <span> {data.bio}</span>
    </div>
  </>
);
