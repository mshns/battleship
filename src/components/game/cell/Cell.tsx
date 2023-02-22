import { FC } from 'react';
import {
  useAppDispatch,
  useAppSelector,
  useGameShipsActions,
} from '@/hook/_index';
import { setDropped } from '@/store/reducers/ShipSlice';
import { dragOverHandler, dragEndHandler, dropHadler } from '@/lib/API/_index';
import { ICell } from './_types';
import { IShip } from '@/store/reducers/types/shipLocation';
import { PERSON } from '@/store/_constants';
import { CELLCLASS } from './_constants';
import './Cell.scss';

const Cell: FC<ICell> = ({ coordinate, isRival }) => {
  const key = isRival ? PERSON.rival : PERSON.user;
  const { addShip } = useGameShipsActions();

  const { decks, isHorizontal } = useAppSelector(
    (state) => state.shipSlice.currentDragedShip,
  );

  const userShips = useAppSelector(
    (state) => state.gameShipsSlice.user.shipsLocation,
  );

  const isShooted = useAppSelector((state) => {
    return state.gameShipsSlice[key].shipsLocation.find((ship) =>
      ship.woundedCells.includes(coordinate),
    );
  });
  const isMissed = useAppSelector((state) => {
    return state.gameShipsSlice[key].misses.some((id) => id === coordinate);
  });
  const isOccupied = useAppSelector((state) => {
    return state.gameShipsSlice[key].notAllowed.some((id) => id === coordinate);
  });

  const isShip = () => {
    if (!isRival) {
      const index = userShips.findIndex((ship) =>
        ship.shipLocation.some((id) => id === coordinate),
      );
      if (index === -1) {
        return false;
      }
      return true;
    } else {
      const rivalShips = useAppSelector(
        (state) => state.gameShipsSlice.rival.shipsLocation,
      );
      const index = rivalShips.findIndex((ship) =>
        ship.shipLocation.some((id) => id === coordinate),
      );
      if (index === -1) {
        return false;
      }
      return true;
    }
  };

  const dispatch = useAppDispatch();
  const setLocations = (ship: IShip) => addShip(PERSON.user, ship);
  const successfullyDrop = () => dispatch(setDropped(true));

  const { shoot, initial, miss, ship } = CELLCLASS;

  let classList = initial as string;
  classList += isShooted ? shoot : '';
  classList += isMissed || isOccupied ? miss : '';
  classList += isShip() ? ship : '';

  return (
    <div
      id={coordinate.toString()}
      className={classList}
      onDragOver={(event) =>
        dragOverHandler(event, isHorizontal, decks, userShips)
      }
      onDragLeave={(event) => dragEndHandler(event, isHorizontal, decks)}
      onDrop={(event) =>
        dropHadler(event, isHorizontal, decks, setLocations, successfullyDrop)
      }
    ></div>
  );
};

export default Cell;
