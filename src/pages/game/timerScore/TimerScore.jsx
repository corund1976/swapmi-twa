import PropTypes from 'prop-types';

import token from 'images/token.webp';

import s from './timerScore.module.css';

const formatTimer = (value) => {
  if (value > 60) {
    const minutes = `${Math.trunc(value / 60) < 10 ? '0' : ''}${Math.trunc(value / 60)}`;
    const seconds = `${value - Math.trunc(value / 60) * 60 < 10 ? '0' : ''}${value - Math.trunc(value / 60) * 60}`;
    return `${minutes}:${seconds}`;
  }
  return `00:${value < 10 ? '0' : ''}${value}`;
};

function TimerScore({ timer, score }) {
  return (
    <div className={s.timer_score_wrapper}>
      <div className={s.timer}>{formatTimer(timer)}</div>
      <div className={s.score}>
        <img src={token} alt="token" />
        <p>{score}</p>
      </div>
    </div>
  );
}

export default TimerScore;

TimerScore.propTypes = {
  timer: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};
