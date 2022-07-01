/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent */
import { Select } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Hooks, Tag } from 'shared';
import { FilterActions, FilterSelectors, TagsSelectors } from 'store';
import styled from 'styled-components';
import { CustomTagRender } from './customTagRender';

const { useDebounce } = Hooks;

export const Tags: React.FC = () => {
  const dispatch = useDispatch();

  const tags = useSelector(TagsSelectors.tagsSelector);
  const initialTags = useSelector(FilterSelectors.filters).tag_id;

  const options = tags
    .map((tag) => ({
      value: tag.task_tag_id,
      label: <Tag color={tag.color}>{tag.name}</Tag>,
      name: tag.name,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const onChangeHandler = (value: string[]) => {
    if (value.length) dispatch(FilterActions.setTags(value));
    else dispatch(FilterActions.removeTags());
  };

  return (
    <Wrap>
      <p>МЕТКА</p>
      <Select
        mode="multiple"
        placeholder="Поиск ..."
        defaultValue={initialTags}
        onChange={useDebounce(onChangeHandler, 1000)}
        style={{ width: '100%' }}
        optionLabelProp="name"
        optionFilterProp="name"
        allowClear
        options={options}
        tagRender={CustomTagRender}
        dropdownClassName="FilterTagDropdown"
        notFoundContent={<div>Не найдено</div>}
      />
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-start;
  margin-bottom: 40px;

  .ant-select-selector {
    border-radius: 8px !important;
    background: var(--color-grey100) !important;
    min-height: 38px;
  }

  p {
    color: var(--color-grey700);
    font: var(--h6-12_16-bold);
    margin-bottom: 15px;
  }
`;
