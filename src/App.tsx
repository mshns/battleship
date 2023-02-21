import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import {
  useLogInActions,
  useGameShipsActions,
  useSocket,
  useGameStateActions,
} from './hook/_index';
import { SocketContext } from './Context';
import { Header, Footer, Background, Modal } from '@/components/_index';
import { authService, gameService } from '@/services/axios/_index';
import { ROUTE } from '@/router/_constants';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { socket, init, setSocket, sendSocket } = useSocket();
  const { setUser } = useLogInActions();
  const { resetGameShips } = useGameShipsActions();
  const { resetGameState } = useGameStateActions();
  const [checkInProccess, setCheckInProccess] = useState(false);

  const check = async () => {
    setCheckInProccess(true);
    const auth = await authService.checkAuth();
    setCheckInProccess(false);
    if (auth) {
      if (location.pathname === ROUTE.game) {
        const response = await gameService.startGame();
        if (response) {
          init(response);
        }
      }
      setUser(auth.name);
    } else {
      if (location.pathname === ROUTE.game) navigate(ROUTE.home);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token') && !checkInProccess) {
      check();
    }
    if (!localStorage.getItem('token') && !checkInProccess) {
      if (location.pathname === ROUTE.game) navigate(ROUTE.home);
    }
  }, []);

  useEffect(() => {
    if (location.pathname !== ROUTE.game) {
      socket?.close();
      setSocket(null);
    }
    resetGameShips();
    // resetGameState();
  }, [location]);

  return (
    <div className="App">
      <SocketContext.Provider value={{ socket, setSocket, init, sendSocket }}>
        <Header />
        <AppRouter />
        <Footer />
        <Modal />
      </SocketContext.Provider>
      <Background />
    </div>
  );
};

export default App;
