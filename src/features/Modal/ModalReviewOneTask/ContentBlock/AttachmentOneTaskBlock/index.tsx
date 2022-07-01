import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { AttachmentIcon } from 'shared/icon';
import { AttachingFilesSelectors, OneTaskSelectors, Types } from 'store';
import { oneTaskSelector } from 'store/slice/oneTask/selectors';
import styled, { css } from 'styled-components';
import { OutputFiles } from './OutputFiles';
import { OutputPendingFileComponent } from './PendingFileItem';
import { PreviewModal } from './PreviewModal';

type FileType = Types.TaskStorageFileType;

export const AttachmentOneTaskBlock = (props: { files: FileType[]; taskId: string }) => {
  const { files, taskId } = props;
  const [deploy, setDeploy] = useState<boolean>(false);
  const [previewFile, setPreviewFile] = useState<FileType | null>(null);

  const pendingFile: number | null = useSelector(
    AttachingFilesSelectors.attachingFilesUploadProgressSelector,
  );

  const imgFiles = useMemo(() => files.filter((f: FileType) => f.type === 'image'), [files]);

  const ordinaryFiles = useMemo(() => files.filter((f: FileType) => f.type === 'file'), [files]);

  return (
    <AttachmentsConteiner filesCount={[imgFiles.length, ordinaryFiles.length]}>
      <div className="attachments_header">
        <div className="attachments_header__icon">
          <AttachmentIcon />
        </div>
        <div className="attachments_header__title">Вложения</div>
        <div className="attachments_header__total_files">
          {files.length}
        </div>
        <div className="attachments_header__deploy_btn">
          <button onClick={() => setDeploy((prev) => !prev)} type="button">
            {deploy ? 'свернуть' : 'развернуть'}
          </button>
        </div>
      </div>
      <div className="attachments_content">
        {deploy ? (
          <>
            <OutputFiles
              files={imgFiles.concat(ordinaryFiles)}
              taskId={taskId}
              setFile={setPreviewFile}
            />
            {pendingFile && <OutputPendingFileComponent />}
          </>
        ) : (
          <>
            <OutputFiles
              files={imgFiles.slice(0, 3).concat(ordinaryFiles.slice(0, 2))}
              taskId={taskId}
              setFile={setPreviewFile}
            />
            {pendingFile && <OutputPendingFileComponent />}
          </>
        )}
      </div>
      {previewFile ? (
        <PreviewModal
          file={previewFile}
          imgFiles={imgFiles}
          taskId={taskId}
          setPreviewFile={setPreviewFile}
        />
      ) : null}
    </AttachmentsConteiner>
  );
};

const AttachmentsConteiner = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  .attachments_header {
    display: flex;
    margin-bottom: 8px;
    &__title {
      font: var(--h5-16_24-medium);
      margin-left: 20px;
    }
    &__total_files {
      color: var(--color-grey700);
      font: var(--h5-16_24-medium);
      margin-left: 5px;
    }
    &__deploy_btn {
      display: ${(props: { filesCount: number[] }) =>
    (props.filesCount[0] > 3 || props.filesCount[1] > 2 ? css`block` : css`none`)};
      button {
        background-color: var(--color-grey200);
        margin-left: 14px;
      }
    }
  }
  .attachments_content {
    margin-left: 36px;
    width: 95%;
  }
  .attachments_content > div {
    float: left;
    margin: 8px;
  }
  button {
    border-radius: 8px;
    color: var(--color-grey600);
    border: none;
    background: none;
  }
`;
