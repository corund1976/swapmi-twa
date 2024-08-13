import { useRef } from 'react';
import PropTypes from 'prop-types';

import s from './bubbleYellow1.module.css';

const doc = document.documentElement;

function BubbleYellow1({ onClick }) {
  const btnRef = useRef();
  const counterRef = useRef(0);

  const handleClick = () => {
    counterRef.current += 1;
    btnRef.current.classList.add('clicked-yellow');

    setTimeout(() => {
      btnRef.current.classList.remove('clicked-yellow');
    }, 500);

    // каждый цикл сбрасываю счетчик
    setTimeout(() => {
      counterRef.current = 0;
    }, 4000);

    if (counterRef.current === 3 && btnRef.current) {
      doc.style.setProperty('--animation-play-state-yellow-1', 'paused');
      btnRef.current.classList.add('counter-yellow');

      setTimeout(() => {
        doc.style.setProperty('--animation-play-state-yellow-1', `running`);
        doc.style.setProperty('--animation-duration-yellow-1', `0s`);
        btnRef.current.classList.remove('counter-yellow');
      }, 500);

      setTimeout(() => {
        doc.style.setProperty('--animation-duration-yellow-1', `8s`);
      }, 4000);

      onClick();
    }
  };

  return (
    <button
      type="button"
      // onTouchStart={handleClick}
      onMouseDown={handleClick}
      className={s.yellow_1}
      title="yellow bubble"
      ref={btnRef}
    />
  );
}

export default BubbleYellow1;

BubbleYellow1.propTypes = {
  onClick: PropTypes.func.isRequired,
};
