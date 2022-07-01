import { Input as InputAntd } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Hooks, Icons } from 'shared';
import { FilterActions } from 'store';
import styled from 'styled-components';

const { useDebounce } = Hooks;
const { SearchIcon } = Icons;

export const Finder: React.FC = () => {
  const dispatch = useDispatch();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      e.target.value ? FilterActions.setSearch(e.target.value) : FilterActions.removeSearch(),
    );
  };

  return <Input prefix={<SearchIcon size={16} />} onChange={useDebounce(onChangeHandler, 1000)} />;
};

const Input = styled(InputAntd)`
  border-radius: 8px;
  height: 38px;
  border: 1px solid var(--color-grey300);
  background: var(--color-grey100);
  margin-bottom: 40px;
  font: var(--paragraph-14_24-regular);
  .ant-input {
    background: var(--color-grey100);
  }
  .ant-input-prefix {
    margin: 0 14px 0 2px;
  }
`;
