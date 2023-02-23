import { useAppSelector, useChatActions } from '@/hook/_index';
import { IMessage } from '@/store/reducers/types/socket';

export const useChatHandler = () => {
  const { pushGameMessage, pushCommonMessage } = useChatActions();
  const { gameInfo } = useAppSelector((state) => state.gameStateSlice);

  const chatHandler = (data: IMessage) => {
    if (gameInfo?.gameId && gameInfo?.gameId === data.mail.gameId) {
      pushGameMessage(data.mail);
    }

    if (!data.mail.gameId) pushCommonMessage(data.mail);

    console.log('chat');
  };

  return { chatHandler };
};