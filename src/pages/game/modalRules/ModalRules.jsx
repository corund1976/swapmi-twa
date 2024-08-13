import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setDisplayGameRules, setDisplayModal } from 'redux/app/appSlice';

import bgi from 'images/modalRules/bgi.webp';
import bubbleGreen from 'images/modalRules/bubble-green.webp';
import bubbleYellow from 'images/modalRules/bubble-yellow.webp';
import bubbleBlue from 'images/modalRules/bubble-blue.webp';
import bubbleRed from 'images/modalRules/bubble-red.webp';
import token from 'images/token.webp';

import s from './modalRules.module.css';

function ModalRules() {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(setDisplayGameRules(false));
    dispatch(setDisplayModal(false));
    close();
  };

  useEffect(() => {
    dispatch(setDisplayModal(true));

    const delayedAction = setTimeout(() => {
      closeModal();
    }, 7000);

    return () => clearTimeout(delayedAction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className={s.modal}>
      <div className={s.container}>
        <img src={bgi} alt="rules" className={s.bgi} />

        <p className={s.title}>The rules of battle!</p>

        <ul className={s.prizes_list}>
          <li>
            <img src={bubbleGreen} alt="bubble green" className={s.bubble} />
            <p className={s.value}>= 1 tap + 1</p>
            <img src={token} alt="token" className={s.token} />
          </li>
          <li>
            <img src={bubbleYellow} alt="bubble yellow" className={s.bubble} />
            <p className={s.value}>= 3 tap + 2</p>
            <img src={token} alt="token" className={s.token} />
          </li>
          <li>
            <img src={bubbleBlue} alt="bubble blue" className={s.bubble} />
            <p className={s.value}>= 5 tap + 3</p>
            <img src={token} alt="token" className={s.token} />
          </li>
          <li>
            <img src={bubbleRed} alt="bubble red" className={s.bubble} />
            <p className={s.value}>= 1 tap - 5</p>
            <img src={token} alt="token" className={s.token} />
          </li>
        </ul>
        <div className={s.value}></div>

        <button type="button" onClick={closeModal} className={s.btn_play}>
          play
        </button>
      </div>
    </div>
  );
}

export default ModalRules;
