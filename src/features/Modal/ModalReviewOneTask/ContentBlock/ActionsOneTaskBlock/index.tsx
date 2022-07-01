import React from 'react';
import { Avatar } from 'antd';
import { useSelector } from 'react-redux';
import { HistorySelectors, UsersSelectors } from 'store';
import styled from 'styled-components';
import { Helpers, Icons } from 'shared';
import { DetailSideBarOneTask } from '../../SideBar';

const { ActionsModalIcon } = Icons;

const { operationsDate, getInitials } = Helpers;

export const ActionsOneTaskBlock = () => {
  const history = useSelector(HistorySelectors.historySelector);
  const allUsers = useSelector(UsersSelectors.usersSelector);
  return (
    <ActionsWrap>
      <div className="ditail_sidebar_mobile">
        <DetailSideBarOneTask />
      </div>
      <div className="modal_actions_titlewrap">
        <ActionsModalIcon />
        <div className="modal_actions_title">Действия</div>
      </div>
      <div className="modal_actions_titlewrap_scrol">
        {history.map((el) => (
          <div key={el.history_command_id} className="modal_actions_box">
            <div className="modal_actions_itemwrap">
              <div className="modal_actions_userwrap">
                <Avatar
                  icon={getInitials(el.user.name)}
                  style={{
                    background:
                      allUsers.find((user) => user.user_id === el.user.user_id)?.color ??
                      'var(--color-grey700)',
                  }}
                  src={el.user.logo}
                  onError={() => true}
                />
                <div className="modal_actions_user">
                  {el.user.name}
                </div>
              </div>
              <div className="modal_actions_itemaction">
                {el.command_name}
              </div>
            </div>
            <div className="modal_actions_timewrap">
              {operationsDate(el.created)}
            </div>
          </div>
        ))}
      </div>
    </ActionsWrap>
  );
};

const ActionsWrap = styled.div`
  @media (max-width: 939px) {
    padding-bottom: 20px;
  }
  .ditail_sidebar_mobile {
    display: none;
  }
  @media (max-width: 939px) {
    .ditail_sidebar_mobile {
      display: block;
      background-color: #fff !important;
    }
  }
  .modal_actions_titlewrap_scrol {
    max-height: 300px;
    padding-right: 3px;
    overflow-x: hidden;
    ::-webkit-scrollbar {
      width: 4px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: var(--color-mainblue-default);
      border-radius: 4px;
      box-shadow: inset 0 0 5px var(--color-blue);
    }

    ::-webkit-scrollbar-thumb:hover {
      background-color: #253861;
    }
  }

  .modal_actions_titlewrap {
    display: flex;
  }
  .modal_actions_title {
    color: var(--color-grey900);
    font: var(--h5-16_24-medium);
    margin-left: 10px;
  }
  .modal_actions_itemwrap {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .modal_actions_userwrap {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .modal_actions_user {
    color: var(--color-grey900);
    font: var(--paragraph-14_20-semibold);
    white-space: nowrap;
    max-width: 167px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .modal_actions_itemaction {
    color: var(--color-grey900);
    font: var(--paragraph-14_20-regular);
  }
  .modal_actions_box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 25px 0 0 34px;
    @media (max-width: 939px) {
      margin: 25px 0 0 20px;
    }
  }
  .modal_actions_timewrap {
    color: var(--color-grey600);
    font: var(--h6-12_16-medium);
    white-space: nowrap;
    margin-left: 8px;
  }
  @media (max-width: 1400px) {
    .modal_actions_itemwrap {
      flex-direction: column;
      align-items: flex-start;
      gap: 0px;
    }
    .modal_actions_itemaction {
      margin-left: 37px;
      margin-top: -5px;
    }
    .modal_actions_user {
      align-self: flex-start;
      margin-top: 3px;
    }
  }
  @media (max-width: 1210px) {
    .modal_actions_box {
      flex-direction: column;
      align-items: flex-start;
    }
    .modal_actions_timewrap {
      margin-left: 37px;
    }
  }
`;
