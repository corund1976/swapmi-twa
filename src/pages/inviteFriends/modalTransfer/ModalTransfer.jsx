import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import friendsSelectors from 'redux/friends/friendsSelectors';

import { setDisplayModal } from 'redux/app/appSlice';
import { setTransferStatus } from 'redux/balance/balanceSlice';

import userOperations from 'redux/user/userOperations';

import useOutsideClick from 'hooks/useOutsideClick';

import Backdrop from 'components/backdrop';

import s from './modalTransfer.module.css';

function ModalTransfer() {
  const dispatch = useDispatch();
  const ticketsReward = useSelector(friendsSelectors.ticketsReward);
  const tokensReward = useSelector(friendsSelectors.tokensReward);

  const modalRef = useRef();

  const [displayTransfer, setDisplayTransfer] = useState(false);

  const closeModal = () => {
    dispatch(userOperations.getUser());

    dispatch(setDisplayModal(false));
    dispatch(setTransferStatus(null));

    setDisplayTransfer(false);
  };

  useEffect(() => {
    dispatch(setDisplayModal(true));

    setDisplayTransfer(true);
  }, [dispatch]);

  useOutsideClick(modalRef, closeModal, displayTransfer);

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
        <p className={s.title}>The transfer has been completed!</p>
        <p className={s.text}>
          The referral fee has been transferred to the total game balance!
        </p>
        <ul className={s.block}>
          <li>
            <p className={s.label}>Tickets translated:</p>
            <div className={s.tickets}>
              <div className={s.ticket_img} />
              {ticketsReward}
            </div>
          </li>
          <li>
            <p className={s.label}>Tokens translated:</p>
            <div className={s.tokens}>
              <div className={s.token_img} />
              {tokensReward.toFixed(2)}
            </div>
          </li>
        </ul>
        <button type="button" onClick={closeModal} className={s.btn_ok}>
          continue
        </button>
      </section>
    </Backdrop>
  );
}

export default ModalTransfer;
