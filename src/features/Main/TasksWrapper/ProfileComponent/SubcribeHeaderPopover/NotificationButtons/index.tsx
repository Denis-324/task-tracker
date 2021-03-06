import React from 'react';

type PropsType = {
  notification: boolean;
};

export const NotificationButton = ({ notification }: PropsType) => (
  <div style={{ paddingTop: '5px' }}>
    <svg width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.98 4.64095C11.8026 3.15337 10.5367 2 9.00131 2C7.46597 2 6.20001 3.15336 6.02258 4.64094C3.51991 5.77546 1.77908 8.29554 1.77908 11.2222V16.2399L0.108582 19.5494C-0.227141 20.2145 0.25626 21 1.0013 21H6.17202C6.58385 22.1652 7.69509 23 9.00131 23C10.3075 23 11.4188 22.1652 11.8306 21H17.0013C17.7463 21 18.2297 20.2145 17.894 19.5494L16.2235 16.2399V11.2222C16.2235 8.29555 14.4827 5.77547 11.98 4.64095ZM14.3308 16.9286L15.3764 19H2.62624L3.67181 16.9286C3.74234 16.7888 3.77908 16.6345 3.77908 16.478V11.2222C3.77908 8.33807 6.11715 6 9.00131 6C11.8855 6 14.2235 8.33807 14.2235 11.2222V16.478C14.2235 16.6345 14.2603 16.7888 14.3308 16.9286Z"
        fill="#92929D"
      />
      {notification ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 8C18.2091 8 20 6.20914 20 4C20 1.79086 18.2091 0 16 0C13.7909 0 12 1.79086 12 4C12 6.20914 13.7909 8 16 8Z"
          fill="#FF0B37"
        />
      ) : null}
    </svg>
  </div>
);
