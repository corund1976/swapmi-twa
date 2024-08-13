import { useRef } from 'react';
import PropTypes from 'prop-types';

import s from './bubbleRed2.module.css';

const doc = document.documentElement;

function BubbleRed2({ onClick }) {
  const btnRef = useRef();
  const counterRef = useRef(0);

  const handleClick = () => {
    counterRef.current += 1;
    btnRef.current.classList.add('clicked-red');

    setTimeout(() => {
      btnRef.current.classList.remove('clicked-red');
    }, 500);

    // каждый цикл сбрасываю счетчик
    setTimeout(() => {
      counterRef.current = 0;
    }, 4000);

    if (counterRef.current === 1 && btnRef.current) {
      doc.style.setProperty('--animation-play-state-red-2', 'paused');
      btnRef.current.classList.add('counter-red');

      setTimeout(() => {
        doc.style.setProperty('--animation-play-state-red-2', `running`);
        doc.style.setProperty('--animation-duration-red-2', `0s`);
        btnRef.current.classList.remove('counter-red');
      }, 500);

      setTimeout(() => {
        doc.style.setProperty('--animation-duration-red-2', `8s`);
      }, 4000);

      onClick();
    }
  };

  return (
    <button
      type="button"
      // onTouchStart={handleClick}
      onMouseDown={handleClick}
      className={s.red_2}
      title="red bubble"
      ref={btnRef}
    />
  );
}

export default BubbleRed2;

BubbleRed2.propTypes = {
  onClick: PropTypes.func.isRequired,
};
