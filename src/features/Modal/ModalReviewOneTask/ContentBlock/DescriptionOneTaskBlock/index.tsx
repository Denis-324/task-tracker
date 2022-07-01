import React from 'react';
import { DescriptionIcon } from 'shared/icon';

export const DescriptionOneTaskBlock = (props: any) => {
  const { description } = props;

  return (
    <div>
      <div>
        <DescriptionIcon />
        <span>Описание</span>
        <button type="button">Изменить</button>
        <p>
          {description}
        </p>
      </div>
    </div>
  );
};
