import React from 'react';
import styled from 'styled-components';

export const SortButton = ({ filtersCount }: PropsType) => (
  <div>
    {filtersCount ? <SelectedSort {...{ filtersCount }} /> : <Sort />}
  </div>
);

const Sort = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.5 16.7604V21C18.5 21.3156 18.3216 21.6042 18.0393 21.7454L14.706 23.412C14.1519 23.6891 13.5 23.2862 13.5 22.6667V16.7604L7.85499 9.86103C7.40981 9.31692 7.79693 8.5 8.49995 8.5H23.5C24.203 8.5 24.5901 9.31692 24.1449 9.86103L18.5 16.7604ZM16.8333 20.485V16.463C16.8333 16.2706 16.8998 16.0841 17.0217 15.9353L21.7414 10.1667H10.2585L14.9782 15.9353C15.1001 16.0841 15.1666 16.2706 15.1666 16.463V21.3183L16.8333 20.485Z"
      fill="#92929D"
    />
    <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" stroke="#E2E2EA" />
  </svg>
);

type PropsType = {
  filtersCount: number | null;
};

const SelectedSort = ({ filtersCount }: PropsType) => (
  <ButtonWrapper>
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.5 16.7604V21C18.5 21.3156 18.3216 21.6042 18.0393 21.7454L14.706 23.412C14.1519 23.6891 13.5 23.2862 13.5 22.6667V16.7604L7.85499 9.86103C7.40981 9.31692 7.79693 8.5 8.49995 8.5H23.5C24.203 8.5 24.5901 9.31692 24.1449 9.86103L18.5 16.7604ZM16.8333 20.485V16.463C16.8333 16.2706 16.8998 16.0841 17.0217 15.9353L21.7414 10.1667H10.2585L14.9782 15.9353C15.1001 16.0841 15.1666 16.2706 15.1666 16.463V21.3183L16.8333 20.485Z"
        fill="#92929D"
      />
    </svg>
    <div className="filtersCount">
      {filtersCount}
    </div>
  </ButtonWrapper>
);

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: var(--color-grey200);
  border: 1px solid var(--color-grey300);
  border-radius: 8px;
  align-items: center;
  column-gap: 3px;
  width: 64px;
  .filtersCount {
    width: 22px;
    height: 20px;
    border-radius: 30px;
    background: var(--color-mainblue-default);
    color: var(--color-grey0);
    font: var(--h6-12_16-bold);
    text-align: center;
    padding-top: 2px;
    padding-right: 1px;
  }
`;
