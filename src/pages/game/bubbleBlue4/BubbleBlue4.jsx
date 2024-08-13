import { useRef } from 'react';
import PropTypes from 'prop-types';

import s from './bubbleBlue4.module.css';

const doc = document.documentElement;

function BubbleBlue4({ onClick }) {
  const btnRef = useRef();
  const counterRef = useRef(0);

  const handleClick = () => {
    counterRef.current += 1;
    btnRef.current.classList.add('clicked-blue');

    setTimeout(() => {
      btnRef.current.classList.remove('clicked-blue');
    }, 500);

    // каждый цикл сбрасываю счетчик
    setTimeout(() => {
      counterRef.current = 0;
    }, 4000);

    if (counterRef.current === 5 && btnRef.current) {
      doc.style.setProperty('--animation-play-state-blue-4', 'paused');
      btnRef.current.classList.add('counter-blue');

      setTimeout(() => {
        doc.style.setProperty('--animation-play-state-blue-4', `running`);
        doc.style.setProperty('--animation-duration-blue-4', `0s`);
        btnRef.current.classList.remove('counter-blue');
      }, 500);

      setTimeout(() => {
        doc.style.setProperty('--animation-duration-blue-4', `8s`);
      }, 4000);

      onClick();
    }
  };

  return (
    <button
      type="button"
      // onTouchEnd={handleClick}
      onMouseDown={handleClick}
      className={s.blue_4}
      title="blue bubble"
      ref={btnRef}
    />
  );
}

export default BubbleBlue4;

BubbleBlue4.propTypes = {
  onClick: PropTypes.func.isRequired,
};
