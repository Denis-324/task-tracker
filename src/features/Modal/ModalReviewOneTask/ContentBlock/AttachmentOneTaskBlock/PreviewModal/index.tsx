import {
  CloseCircleOutlined,
  CloudDownloadOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { Modal } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FileIcon, PreviewModalMenuLine } from 'shared/icon';
import { AttachingFilesEffects, OneTaskSelectors, Types } from 'store';
import styled from 'styled-components';

type FileType = Types.TaskStorageFileType;

export const PreviewModal = (props: {
  file: FileType;
  imgFiles: FileType[];
  setPreviewFile: React.Dispatch<React.SetStateAction<FileType | null>>;
  taskId: string;
}) => {
  const { file, imgFiles, setPreviewFile, taskId } = props;
  const isAuthor = useSelector(OneTaskSelectors.currentUserIsAuthorSelector);
  const dispatch = useDispatch();

  const { confirm } = Modal;

  if (!imgFiles.length) setPreviewFile(null);

  let currentPreviewImg = imgFiles.findIndex((img) => img.storage_file_id === file.storage_file_id);

  const next = () => {
    if (currentPreviewImg === imgFiles.length - 1) {
      setPreviewFile(imgFiles[0]);
    } else {
      setPreviewFile(imgFiles[currentPreviewImg + 1]);
    }
  };

  const prev = () => {
    if (currentPreviewImg === 0) {
      setPreviewFile(imgFiles[imgFiles.length - 1]);
    } else {
      setPreviewFile(imgFiles[(currentPreviewImg -= 1)]);
    }
  };

  return (
    <PreviewConteiner storageId={file.storage_file_id}>
      <div className="img_preview_modal">
        <div className="img_preview_modal__header">
          <div className="img_preview_modal__header__left_side">
            <div className="img_preview_modal__header__left_side__icon">
              <FileIcon />
            </div>
            <div className="img_preview_modal__header__left_side__img_description">
              <div className="img_preview_modal__header__left_side__img_description__title">
                {file.name_original}
              </div>
              <div className="img_preview_modal__header__left_side__img_description__type">
                {file.content_type}
              </div>
            </div>
          </div>
          <div className="img_preview_modal__header__right_side">
            {isAuthor && (
              <div className="img_preview_modal__header__right_side__delete_btn">
                <button
                  type="button"
                  onClick={() => {
                    confirm({
                      title: 'Вы действительно хотите удалить вложение?',
                      icon: <ExclamationCircleOutlined />,
                      okText: 'Отмена',
                      okType: 'danger',
                      cancelText: 'Продолжить',
                      onCancel() {
                        dispatch(
                          AttachingFilesEffects.detachFile({
                            taskId,
                            storage_id: file.storage_file_id,
                          }),
                        );
                        if (imgFiles.indexOf(file) === 0) next();
                        else prev();
                      },
                    });
                  }}
                >
                  <DeleteOutlined style={{ fontSize: '24px', color: 'var(--color-red)' }} />
                </button>
              </div>
            )}

            <div className="img_preview_modal__header__right_side__download_btn">
              <a
                key={file.storage_file_id}
                href={`${process.env.REACT_APP_TASK_BACKEND_URL}storage/files/${file.storage_file_id}/download`}
                rel="noopener noreferrer"
              >
                <CloudDownloadOutlined style={{ fontSize: '24px' }} />
              </a>
            </div>
            <div className="img_preview_modal__header__right_side__line">
              <PreviewModalMenuLine />
            </div>
            <div className="img_preview_modal__header__right_side__close_btn">
              <button type="button" onClick={() => setPreviewFile(null)}>
                <CloseCircleOutlined style={{ fontSize: '24px' }} />
              </button>
            </div>
          </div>
        </div>
        <div className="img_preview_modal__viewer">
          <div className="img_preview_modal__viewer__view">
            <button
              type="button"
              className="img_preview_modal__viewer__view__preview_control left"
              onClick={prev}
            >
              <LeftOutlined />
            </button>
            <div className="img_preview_modal__viewer__view__preview_img" />
            <button
              type="button"
              className="img_preview_modal__viewer__view__preview_control right"
              onClick={next}
            >
              <RightOutlined />
            </button>
          </div>
          <div className="img_preview_modal__img_list">
            {imgFiles.map((img) => (
              <button type="button" onClick={() => setPreviewFile(img)}>
                <div
                  className={
                    img.storage_file_id === file.storage_file_id ?
                      'img_preview_modal__img_list__item active' :
                      'img_preview_modal__img_list__item'
                  }
                >
                  <img
                    src={`${process.env.REACT_APP_TASK_BACKEND_URL}storage/files/${img.storage_file_id}/download`}
                    alt=""
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </PreviewConteiner>
  );
};

const PreviewConteiner = styled.div`
  & {
    display: block;
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.45);
    z-index: 1000;
    button {
      cursor: pointer;
    }
    .img_preview_modal {
      &__header {
        background-color: white;
        height: 78px;
      }
      &__header {
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 0 41px;
        &__right_side {
          display: grid;
          grid-template-columns: repeat(4, auto);
          justify-content: end;
          align-items: center;
          gap: 26px;
          button {
            background: none;
            color: var(--color-grey700);
          }
          &__download_btn a {
            color: var(--color-grey700);
          }
        }
        &__left_side {
          display: grid;
          grid-template-columns: repeat(2, auto);
          justify-content: start;
          align-items: center;
          gap: 16px;
          &__img_description__title {
            margin-top: -10px;
            font: var(--h5-16_24-medium);
            color: var(--color-grey900);
          }
          &__img_description__type {
            font: var(--paragraph-14_16-regular);
            color: var(--color-grey500);
          }
        }
      }

      &__viewer {
        max-width: 1265px;
        width: 100%;
        margin: 155px auto;
        height: 713px;
        &__view {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 42px;
          &__preview_img {
            background-image: url(${(props: { storageId: string }) =>
    `${process.env.REACT_APP_TASK_BACKEND_URL}storage/files/${props.storageId}/download`});
            background-size: cover;
            width: 1100px;
            height: 605px;
            border-radius: 16px;
          }
          img {
            max-width: 1100px;
            width: 100%;
            max-height: 605px;
            height: 100%;
            border-radius: 16px;
          }
          &__preview_control {
            background-color: var(--color-grey0);
            width: 40px;
            height: 40px;
            border-radius: 8px;
            &:hover {
              background-color: var(--color-mainblue-default);
            }
            .right {
              margin-left: 40px;
              color: var(--color-grey600);
            }
            .left {
              margin-right: 40px;
            }
          }
        }
      }

      &__img_list {
        margin-top: 18px;
        display: flex;
        gap: 16px;
        justify-content: center;
        &__item {
          img {
            width: 163px;
            height: 90px;
            border: 1px solid var(--color-grey300);
            border-radius: 8px;
          }
        }
      }
    }
    .active img {
      border: solid 2px var(--color-mainblue-default);
      border-radius: 8px;
    }
  }
`;
