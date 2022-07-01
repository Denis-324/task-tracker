import React from 'react';
import styled from 'styled-components';
import { AssignToMe } from './AssignToMe';
import { Attachment } from './Attachment';
import { Finder } from './Finder';
import { Members } from './Members';
import { Priority } from './Priority';
import { Status } from './Status';
import { Tags } from './Tags';

export const FilterWrapperComponent = () => (
  <FilterWrapper>
    <AssignToMe />
    <Finder />
    <Members />
    <Status />
    <Tags />
    <Attachment />
    <Priority />
  </FilterWrapper>
);

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 40px 16px;
  min-height: 100vh;
  background: var(--color-grey0);
  border-right: 1px solid var(--color-grey300);
  align-items: center;
  justify-content: flex-start;
  overflow: auto;
  @media (max-width: 645px) {
    display: none;
  }
`;
