import { useRef } from 'react';
import PropTypes from 'prop-types';

import s from './bubbleGreen4.module.css';

const doc = document.documentElement;

function BubbleGreen4({ onClick }) {
  const btnRef = useRef();
  const counterRef = useRef(0);

  const handleClick = () => {
    counterRef.current += 1;
    btnRef.current.classList.add('clicked-green');

    setTimeout(() => {
      btnRef.current.classList.remove('clicked-green');
    }, 500);

    // каждый цикл сбрасываю счетчик
    setTimeout(() => {
      counterRef.current = 0;
    }, 4000);

    if (counterRef.current === 1 && btnRef.current) {
      doc.style.setProperty('--animation-play-state-green-4', 'paused');
      btnRef.current.classList.add('counter-green');

      setTimeout(() => {
        doc.style.setProperty('--animation-play-state-green-4', `running`);
        doc.style.setProperty('--animation-duration-green-4', `0s`);
        btnRef.current.classList.remove('counter-green');
      }, 500);

      setTimeout(() => {
        doc.style.setProperty('--animation-duration-green-4', `8s`);
      }, 4000);

      onClick();
    }
  };

  return (
    <button
      type="button"
      // onTouchStart={handleClick}
      onMouseDown={handleClick}
      className={s.green_4}
      title="green bubble"
      ref={btnRef}
    />
  );
}

export default BubbleGreen4;

BubbleGreen4.propTypes = {
  onClick: PropTypes.func.isRequired,
};
