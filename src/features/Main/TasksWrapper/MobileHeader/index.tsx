import React from 'react';
import styled from 'styled-components';
import { ProfileComponent } from '../ProfileComponent';
import { SortButton } from './SortButton';

export const MobileHeaderComponent = () => (
  <MobileHeader>
    <HeaderLeftSide>
      <SortButton filtersCount={12} />
    </HeaderLeftSide>
    <HeaderRightSide>
      <ProfileComponent />
    </HeaderRightSide>
  </MobileHeader>
);

const MobileHeader = styled.div`
  display: none;
  @media (max-width: 645px) {
    padding: 10px 11px 10px 16px;
    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-between;
    align-content: center;
    background: var(--color-grey0);
  }
`;

const HeaderLeftSide = styled.div`
  @media (max-width: 645px) {
    display: grid;
  }
`;

const HeaderRightSide = styled.div`
  @media (max-width: 645px) {
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
  }
`;
