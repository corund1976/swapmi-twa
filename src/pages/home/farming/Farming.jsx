import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import authSelectors from 'redux/auth/authSelectors';
import farmingSelectors from 'redux/farming/farmingSelectors';

import farmingOperations from 'redux/farming/farmingOperations';
import userOperations from 'redux/user/userOperations';

import token from 'images/token.webp';

import ModalInfo from '../modalInfo';

import s from './farming.module.css';

const doc = document.documentElement;

const formatTimer = () => {
  const now = new Date();
  const hour = 23 - now.getUTCHours();
  const min = 59 - now.getUTCMinutes();
  const sec = 59 - now.getUTCSeconds();
  return `${hour < 10 ? '0' : ''}${hour}:${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
};

function Farming({ setDisplayConfetti }) {
  const dispatch = useDispatch();
  const isAuth = useSelector(authSelectors.isAuthorized);
  const isFarming = useSelector(farmingSelectors.isFarming);
  const progressReward = useSelector(farmingSelectors.progressReward);
  const progressPercent = useSelector(farmingSelectors.progressPercent);
  const reward = useSelector(farmingSelectors.reward);

  const [timer, setTimer] = useState(null);

  const [displayInfo, setDisplayInfo] = useState(false);
  const toggleInfo = () => setDisplayInfo(!displayInfo);

  const startFarming = () => dispatch(farmingOperations.startFarming());

  const claimReward = () => {
    farmingOperations.claimFarming();

    setDisplayConfetti(true);

    setTimeout(() => {
      setDisplayConfetti(false);
      dispatch(userOperations.getUser());
    }, 4000);
  };

  useEffect(() => {
    if (isAuth && isFarming) dispatch(farmingOperations.getFarmingProgress());
  }, [dispatch, isAuth, isFarming]);

  useEffect(() => {
    if (progressPercent)
      doc.style.setProperty(
        '--progress-percent-width',
        `calc(${progressPercent > 10 ? progressPercent : 10}% - 8px)`,
      );
  }, [progressPercent]);

  useEffect(() => {
    if (isFarming) {
      const now = new Date();
      const hour = 23 - now.getHours();
      const min = 59 - now.getMinutes();
      const sec = 59 - now.getSeconds();

      setTimer(hour * 60 * 60 + min * 60 + sec);
    }
  }, [isFarming]);

  useEffect(() => {
    const delayedAction = setTimeout(() => {
      if (isFarming) {
        if (timer > 0) setTimer(timer - 1);
        else {
          setTimer(null);
          dispatch(userOperations.getUser());
        }
      }
    }, 1000);

    return () => clearTimeout(delayedAction);
  }, [dispatch, isFarming, timer]);

  const blockStyles =
    !isFarming && reward === 0 ? s.block_farming_w_bg : s.block_farming;

  return (
    <>
      <div className={blockStyles}>
        {!isFarming && reward === 0 && (
          <>
            <div className={s.info}>
              <button
                type="button"
                onClick={toggleInfo}
                className={s.btn_info}
              />
              <p>Start now and collect the reward in 24 hours!</p>
            </div>
            <button
              type="button"
              onClick={startFarming}
              className={s.btn_farm}
              disabled={isFarming}
            >
              farming
            </button>
          </>
        )}

        {isFarming && reward === 0 && (
          <>
            <div className={s.progress}>
              Farming
              <img src={token} alt="token" />
              <span className={s.amount}>{progressReward.toFixed(0)}</span>
              <span className={s.percent}>{progressPercent}%</span>
            </div>
            <div className={s.timer}>{formatTimer()}</div>
          </>
        )}

        {!isFarming && reward !== 0 && (
          <button type="button" onClick={claimReward} className={s.btn_claim}>
            claim <img src={token} alt="token" /> {reward.toFixed(2)}
          </button>
        )}
      </div>

      {displayInfo && <ModalInfo close={toggleInfo} />}
    </>
  );
}

export default Farming;

Farming.propTypes = {
  setDisplayConfetti: PropTypes.func.isRequired,
};
