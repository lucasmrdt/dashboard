/* eslint-disable react/display-name */
import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Select, Icon } from 'antd';

import { WidgetImplementation, OptionHOC } from '../../types';

const { Option } = Select;

export const REPOSITORY_OPTIONS: { [key: string]: OptionHOC } = {
  timezone: (updater, params, data) =>
    data && (
      <Select
        defaultValue={params.repository || data.avaibleRepositories[0]}
        onChange={(value: any) => updater('repository', value)}
      >
        {data.avaibleRepositories.map((repo: any) => (
          <Option key={repo} value={repo}>
            {repo}
          </Option>
        ))}
      </Select>
    ),
};

const styles = StyleSheet.create({
  description: {
    textAlign: 'center',
  },
});

interface Data {
  selectedRepository: {
    name: string;
    // eslint-disable-next-line camelcase
    stargazers_count: string;
    description: string;
  };
}

interface Params {
  timezone: string;
}

export const RepositoryWidget: WidgetImplementation<Data, Params> = ({
  data: { selectedRepository },
}) => (
  <>
    <h1>{selectedRepository.name}</h1>
    <div>
      <Icon type="star" />
      <span> {selectedRepository.stargazers_count}</span>
    </div>
    <span className={css(styles.description)}>{selectedRepository.description}</span>
  </>
);
