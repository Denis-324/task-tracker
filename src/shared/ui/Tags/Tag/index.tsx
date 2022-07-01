import React from 'react';
import styled from 'styled-components';
import { Tag as TagAntd, TagProps } from 'antd';

export const Tag: React.FC<TagProps> = ({ children, ...props }) => (
  <TagWrapper {...props}>
    {children}
  </TagWrapper>
);

const TagWrapper = styled(TagAntd)`
  display: flex;
  height: 24px;
  font: var(--h6-12_16-medium);
  margin: 4px 2px;
  padding: 0 11px 0 11px;
  border: 1px solid;
  border-radius: 12px;
  align-items: center;
  justify-content: space-between;
  user-select: none;
  cursor: pointer;
  @media (max-width: 560px) {
    overflow: hidden;
    height: 4px;
    width: 70px;
    border: 2px solid;
    border-radius: none;
    cursor: auto;
  }
`;
