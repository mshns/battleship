import { IShip } from '@/store/reducers/types/shipLocation';

export const checkShipAlive = (index: number, ships: IShip[]) => {
  const ship = ships[index];
  console.log(ship.decks, ship.woundedCells.length);
  if (ship.decks - 1 === ship.woundedCells.length) {
    return false;
  }
  return true;
};
