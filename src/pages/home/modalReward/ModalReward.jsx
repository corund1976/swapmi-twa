import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import balanceSelectors from 'redux/balance/balanceSelectors';

import { setDisplayDailyReward, setDisplayModal } from 'redux/app/appSlice';

import balanceOperations from 'redux/balance/balanceOperations';
import userOperations from 'redux/user/userOperations';

import useOutsideClick from 'hooks/useOutsideClick';

import Backdrop from 'components/backdrop';

import s from './modalReward.module.css';

function ModalReward() {
  const dispatch = useDispatch();
  const dailyTokens = useSelector(balanceSelectors.dailyTokens);
  const dailyTickets = useSelector(balanceSelectors.dailyTickets);

  const modalRef = useRef();

  const [displayReward, setDisplayReward] = useState(false);

  const closeModal = () => {
    dispatch(userOperations.getUser());

    dispatch(setDisplayModal(false));
    dispatch(setDisplayDailyReward(false));

    setDisplayReward(false);
  };

  useEffect(() => {
    dispatch(setDisplayModal(true));

    setDisplayReward(true);

    dispatch(balanceOperations.getDailyReward());
  }, [dispatch]);

  useOutsideClick(modalRef, closeModal, displayReward);

  return (
    <Backdrop>
      <section className={s.modal} ref={modalRef}>
        <button
          type="button"
          onClick={closeModal}
          className={s.btn_close}
          title="close"
        />
        <div className={s.bgi} />
        <p className={s.title}>Your daily reward</p>
        <p className={s.text}>
          Come back tomorrow and get reward!
          <br />
          Tip: The reward will burn if not claimed
        </p>
        <ul className={s.block}>
          <li>
            <p className={s.label}>Tickets:</p>
            <div className={s.tickets}>
              <div className={s.ticket_img} />
              {dailyTickets}
            </div>
          </li>
          <li>
            <p className={s.label}>Tokens:</p>
            <div className={s.tokens}>
              <div className={s.token_img} />
              {dailyTokens}
            </div>
          </li>
        </ul>
        <button type="button" onClick={closeModal} className={s.btn_ok}>
          claim
        </button>
      </section>
    </Backdrop>
  );
}

export default ModalReward;
