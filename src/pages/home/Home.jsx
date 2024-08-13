import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Confetti from 'react-confetti';

import appSelectors from 'redux/app/appSelectors';
import userSelectors from 'redux/user/userSelectors';
import balanceSelectors from 'redux/balance/balanceSelectors';
import gameSelectors from 'redux/game/gameSelectors';
import farmingSelectors from 'redux/farming/farmingSelectors';

import RouteNames from 'router/routes';

import avatarDefault from 'images/avatar-default.svg';

import Container from 'components/container';

import Farming from './farming';
import ModalWithdraw from './modalWithdraw';
import ModalReward from './modalReward';
import ModalTickets from './modalTickets';

import s from './home.module.css';

function Home() {
  const screenW = useSelector(appSelectors.screenWidth);
  const screenH = useSelector(appSelectors.screenHeight);
  const user = useSelector(userSelectors.user);
  const tokens = useSelector(balanceSelectors.tokens);
  const tickets = useSelector(gameSelectors.tickets);
  const isFarming = useSelector(farmingSelectors.isFarming);
  const displayDailyReward = useSelector(appSelectors.displayDailyReward);

  const navigate = useNavigate();

  const [displayWithdraw, setDisplayWithdraw] = useState(false);
  const toggleWithdraw = () => setDisplayWithdraw(!displayWithdraw);

  const [displayTickets, setDisplayTickets] = useState(false);
  const toggleTickets = () => setDisplayTickets(!displayTickets);

  const [displayConfetti, setDisplayConfetti] = useState(false);

  const handlePlay = () => {
    // navigate(RouteNames.GAME);
    if (Number(tickets) > 0) navigate(RouteNames.GAME);
    else toggleTickets();
  };
  return (
    <section className={s.section}>
      <Container>
        <img
          src={user?.telegramAvatar || user?.avatar || avatarDefault}
          alt="avatar"
          className={s.avatar}
        />

        <p className={s.name}>{user?.telegramName}</p>

        <div className={s.block_balance}>
          <p className={s.label}>Game balance:</p>
          <div className={s.balance}>
            <div className={s.token_img} />
            {tokens?.toFixed(2).toLocaleString('ru')}
          </div>
        </div>

        <div className={s.block_tickets}>
          <div>
            <p className={s.label}>Tickets:</p>
            <div className={s.tickets}>
              <div className={s.ticket_img} />
              {tickets}
            </div>
          </div>
          <button type="button" onClick={handlePlay} className={s.btn_play}>
            play
          </button>
        </div>

        <Farming setDisplayConfetti={setDisplayConfetti} />

        <button
          type="button"
          onClick={toggleWithdraw}
          className={s.btn_withdraw}
          disabled={isFarming}
        >
          withdrawal
        </button>

        <p className={s.warning}>
          Attention! To withdraw SPIM tokens from your balance and purchase a
          SwapmiOne subscription, you need to register an account on our website{' '}
          <a
            href="https://swapmi.pro"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.swapmi.pro
          </a>
        </p>
      </Container>
      {displayWithdraw && <ModalWithdraw close={toggleWithdraw} />}
      {displayDailyReward && <ModalReward />}
      {displayTickets && <ModalTickets close={toggleTickets} />}
      {displayConfetti && (
        <Confetti
          width={screenW}
          height={screenH}
          numberOfPieces={800}
          // recycle={displayConfetti}
        />
      )}
    </section>
  );
}

export default Home;
