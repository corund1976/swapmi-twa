import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import WebApp from '@twa-dev/sdk';
import Confetti from 'react-confetti';

import appSelectors from 'redux/app/appSelectors';
import userSelectors from 'redux/user/userSelectors';
import gameSelectors from 'redux/game/gameSelectors';
import balanceSelectors from 'redux/balance/balanceSelectors';

import { setDisplayModal } from 'redux/app/appSlice';

import gameOperations from 'redux/game/gameOperations';

import RouteNames from 'router/routes';

import token from 'images/token.webp';

import s from './modalResult.module.css';

function ModalResult({ score, close }) {
  const dispatch = useDispatch();
  const screenW = useSelector(appSelectors.screenWidth);
  const screenH = useSelector(appSelectors.screenHeight);
  const user = useSelector(userSelectors.user);
  const tickets = useSelector(gameSelectors.tickets);
  const tokens = useSelector(balanceSelectors.tokens);

  const navigate = useNavigate();

  const [displayConfetti, setDisplayConfetti] = useState(false);

  const closeModal = () => {
    setDisplayConfetti(false);

    dispatch(setDisplayModal(false));

    close();
  };

  const goBack = () => {
    closeModal();
    navigate(RouteNames.MAIN);
  };

  const inviteFriends = () => {
    const url = user.refLink;
    const text =
      'Play with me and get access to awesome crypto bots on the smart auto-trading platform Swapmi.';

    // https://t.me/share/url?url={url}&text={text}
    // https://telegram.me/share/url?url={url}&text={text}
    // tg://msg_url?url={url}&text={text}
    WebApp.openTelegramLink(`https://t.me/share/url?url=${url}&text=${text}`);
  };

  useEffect(() => {
    dispatch(setDisplayModal(true));

    const newBalance = tokens + score;

    dispatch(gameOperations.updateGameData(user, newBalance));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    const delayedAction = setTimeout(() => {
      setDisplayConfetti(false);
    }, 4000);

    return () => clearTimeout(delayedAction);
  }, []);

  useEffect(() => {
    if (score) setDisplayConfetti(true);
  }, [score]);

  return (
    <div className={s.modal}>
      <button
        type="button"
        onClick={goBack}
        className={s.btn_close}
        title="close"
      />

      <div className={s.container}>
        <p className={s.title}>
          {score === 0 && 'Trouble happens'}
          {score >= 1 && score <= 30 && 'Not bad, not bad'}
          {score >= 30 && score <= 50 && 'One shot, one bubble!'}
          {score > 50 && 'Your are real bubble killer!'}
        </p>
        <p className={s.label}>Rewards:</p>
        <div className={s.value}>
          <img src={token} alt="token" />
          <p>{score.toFixed(0)}</p>
        </div>
        <button type="button" onClick={inviteFriends} className={s.btn_invite}>
          invite friends and get tickets
        </button>
        <button
          type="button"
          onClick={closeModal}
          className={s.btn_play}
          disabled={tickets === 0}
        >
          play now ( {tickets} tickets )
        </button>
      </div>

      {displayConfetti && (
        <Confetti
          width={screenW}
          height={screenH}
          numberOfPieces={800}
          // recycle={displayConfetti}
        />
      )}
    </div>
  );
}

export default ModalResult;

ModalResult.propTypes = {
  score: PropTypes.number.isRequired,
  close: PropTypes.func.isRequired,
};
