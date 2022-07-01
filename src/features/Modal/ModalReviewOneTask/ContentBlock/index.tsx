import React from 'react';
import { useSelector } from 'react-redux';
import { OneTaskSelectors } from 'store';
import styled from 'styled-components';
import { CheckList } from './CheckList';
import { ActionsOneTaskBlock } from './ActionsOneTaskBlock';
import { AttachmentOneTaskBlock } from './AttachmentOneTaskBlock';
import { DescriptionOneTaskBlock } from './DescriptionOneTaskBlock';
import { HeaderOneTaskBlock } from './HeaderOneTaskBlock';

export const DetailContentOneTask = () => {
  const item = useSelector(OneTaskSelectors.oneTaskSelector);
  return (
    <Wrap>
      <HeaderOneTaskBlock
        title={item.title}
        isCheckList={!!item.check_lists.length}
        taskID={item.task_id}
        attachmentsFilesMaxCount={item.storage_files.length >= 15}
      />
      <DescriptionOneTaskBlock description={item.description} />
      {item.check_lists.length ? (
        <CheckList checkList={item.check_lists[0]} progress={item.progress} taskID={item.task_id} />
      ) : null}
      <AttachmentOneTaskBlock taskId={item.task_id} files={item.storage_files} />
      <ActionsOneTaskBlock />
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 24px;
  width: calc(100% - 48px);
`;
