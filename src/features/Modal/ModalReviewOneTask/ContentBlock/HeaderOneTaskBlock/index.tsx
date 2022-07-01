import { Dropdown, Menu, MenuProps, Modal, Popover, Upload } from 'antd';
import {
  AttachingFilesEffects,
  OneTaskEffects,
  countSubscribesSelectors,
  countSubscribesEffects,
  OneTaskSelectors,
} from 'store';
import { EyeInvisibleOutlined } from '@ant-design/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icons } from 'shared';
import styled from 'styled-components';
import { DetailSideBarOneTask } from '../../SideBar';

const { EditIcon, EyeVisibleIcon, PlusIcon } = Icons;

type HeaderProps = {
  title: string;
  isCheckList: boolean;
  taskID: string;
  attachmentsFilesMaxCount: boolean;
};

export const HeaderOneTaskBlock: React.FC<HeaderProps> = (props) => {
  const { title, isCheckList, taskID, attachmentsFilesMaxCount } = props;
  const dispatch = useDispatch();

  const countSub = useSelector(countSubscribesSelectors.countSubscribesSelector);
  const checkUnknownRole = useSelector(OneTaskSelectors.currentUserIsUnknownSelector);

  const arrCountSub = countSub.map((el) => el.relation_id);
  const objCountSub = countSub.map((el) => ({
    [el.relation_id]: el.subscribe_id,
  }));
  const getSubId = () => objCountSub.filter((el) => el[taskID])[0][taskID];

  const plusMenuHandler: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case 'add_check-list':
        dispatch(
          OneTaskEffects.checkListCreate({
            body: {
              title: 'Чек-лист',
            },
            taskID,
          }),
        );

        break;
      case 'add_file':
        break;
      default:
    }
  };
  const upload = (file: any) => {
    if (file.file.size > 2097152) {
      Modal.error({
        title: 'Файл не может быть добавлен.',
        content: 'Макимальный размер файла 2 МБ',
      });
    } else {
      const formDataFile = new FormData();
      formDataFile.append('file', file.file);
      dispatch(
        AttachingFilesEffects.attachFileToTask({
          name_original: file.file.name,
          file: formDataFile,
          task_id: taskID,
          file_type: file.file.type,
        }),
      );
    }
  };
  const setSubscribe = () => {
    dispatch(
      countSubscribesEffects.subscribe({
        notifies: {
          web_hook: {
            url: 'http://domain.my/endpoint/:param',
            method: 'POST',
          },
          me: true,
        },
        relation_type: 'task',
        relation_id: taskID,
      }),
    );
  };
  const setUnSubscribe = () => {
    dispatch(countSubscribesEffects.deleteSubscribe(getSubId()));
  };
  return (
    <HeaderModal>
      <Title>
        <span style={{ marginRight: '10px' }}>
          {title}
        </span>
        <EditIcon />
      </Title>
      <MenuWrap>
        {!checkUnknownRole && (
          <Dropdown
            overlay={
              <Menu onClick={plusMenuHandler}>
                <Menu.Item key="add_check-list" disabled={isCheckList}>
                  {isCheckList ? (
                    <Popover
                      content={
                        <span>
                          Добавлено максимальное
                          <br />
                          количество чек-листов
                        </span>
                      }
                      placement="leftTop"
                    >
                      <div>Добавить чек-лист</div>
                    </Popover>
                  ) : (
                    <div>Добавить чек-лист</div>
                  )}
                </Menu.Item>

                {attachmentsFilesMaxCount ? (
                  <Menu.Item disabled={attachmentsFilesMaxCount}>
                    <Popover
                      content={
                        <span>
                          Добавлено максимальное
                          <br />
                          количество вложений
                        </span>
                      }
                      placement="leftTop"
                    >
                      <div>Прикрепить вложение</div>
                    </Popover>
                  </Menu.Item>
                ) : (
                  <Upload
                    customRequest={(file) => upload(file)}
                    listType="picture"
                    showUploadList={false}
                    accept=".doc,.docx,.pdf,.txt,.ppt,.gif,.png"
                    disabled={attachmentsFilesMaxCount}
                  >
                    <Menu.Item>Прикрепить вложение</Menu.Item>
                  </Upload>
                )}
              </Menu>
            }
            placement="bottomRight"
            trigger={['click']}
          >
            <div>
              <PlusIcon />
            </div>
          </Dropdown>
        )}

        {!checkUnknownRole &&
          (!arrCountSub.includes(taskID) ? (
            <button onClick={setSubscribe} className="modal_header_subscribes" type="button">
              <EyeInvisibleOutlined style={{ color: 'rgb(146, 146, 157)' }} />
            </button>
          ) : (
            <button onClick={setUnSubscribe} className="modal_header_subscribes" type="button">
              <EyeVisibleIcon />
            </button>
          ))}
      </MenuWrap>
    </HeaderModal>
  );
};

const HeaderModal = styled.div`
  display: flex;
  justify-content: space-between;
  font: var(--h2-24_32-medium);
  border-bottom: 1px solid var(--color-grey300);

  @media (max-width: 939px) {
    flex-direction: column;
    div:nth-child(1) {
      order: 2;
    }
    div:nth-child(2) {
      order: 1;
      margin-top: 10px;
    }
    div:nth-child(3) {
      order: 3;
    }
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
`;

const MenuWrap = styled.div`
  display: flex;
  .modal_header_subscribes {
    margin: 0px;
    padding: 0px;
    border: none;
    background: none;
    cursor: pointer;
  }
`;
