import route from 'react-router-dom';
import { FC } from 'react';
import { Socket } from '@/services/Socket';
import { gameService } from '@/services/axios/Game';

const Game: FC = () => {
  const getId = async () => {
    const socketId = await gameService.startGame();

    if (socketId) {
      const socket = new Socket(socketId);
    }
  };

  getId();

  // const sendHandler = () => {
  //   socket.instance.send(
  //     JSON.stringify({
  //       id: id,
  //     }),
  //   );
  // };

  return (
    <div>
      <button></button>
    </div>
  );
};

export default Game;
