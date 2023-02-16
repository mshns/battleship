import Cell from '@/components/game/cell/Cell';
import { IField } from './_types';

import './field.scss';
import { FIELD } from '@/store/_constants';

const Field = ({
  isRival,
  isAbleShoot = true,
  isStarted = true,
}: IField) => {
  return (
    <div
      style={{ opacity: isAbleShoot && isStarted ? 1 : 0.5 }}
      className="battleground"
    >
      {FIELD.map((_, index) => (
        <Cell key={index} coordinate={index} isRival={isRival} />
      ))}
    </div>
  );
};

export default Field;
