import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { setDisplayModal } from 'redux/app/appSlice';

import useOutsideClick from 'hooks/useOutsideClick';
import useSwipeDetection from 'hooks/useSwipeDetection';

import Backdrop from 'components/backdrop';

import s from './modalInfo.module.css';

function ModalInfo({ close }) {
  const dispatch = useDispatch();

  const modalRef = useRef();

  const [displayInfo, setDisplayInfo] = useState(false);

  const closeModal = () => {
    dispatch(setDisplayModal(false));
    setDisplayInfo(false);
    close();
  };

  const { swipeVertical } = useSwipeDetection(displayInfo);

  useEffect(() => {
    dispatch(setDisplayModal(true));
    setDisplayInfo(true);
  }, [dispatch]);

  useEffect(() => {
    if (swipeVertical === 'down') closeModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [swipeVertical]);

  useOutsideClick(modalRef, closeModal, displayInfo);

  const modalStyles = displayInfo ? s.modal : s.modal_hidden;

  return (
    <Backdrop>
      <section className={modalStyles} ref={modalRef}>
        <div className={s.container}>
          <p className={s.title}>How it`s work partner program</p>
          <p className={s.text}>
            How does the program work?
            <br />
            For inviting a friend via an invitation link, the inviter receives
            the following types of affiliate rewards:
            <br />
            1. For bringing in a friend — 100 SPIM and 1 ticket. To receive the
            reward, the friend must use the inviter`s link and play one round in
            the game `Bubble Killer`.
            <br />
            2. For the friend`s farming — 10% of the invited friend`s farming
            rewards. To receive this reward, the invited friend must claim their
            daily farming reward by pressing the `Claim` button. The inviter
            receives 10% of each farming reward claimed by the friend, with no
            time or quantity limits.
            <br />
            3. For transferring tokens to a web account — 10 SPIM and 1 ticket.
            To receive this reward, the friend must transfer SPIM tokens to
            their web account at www.swapmi.pro. The reward is only given for
            the friend`s first token transfer.
            <br />
            To transfer the affiliate reward to your game balance, click the
            `Transfer` button. The transfer of affiliate rewards to the game
            balance can only be done when the farming function is inactive.
          </p>
        </div>
      </section>
    </Backdrop>
  );
}

export default ModalInfo;

ModalInfo.propTypes = {
  close: PropTypes.func.isRequired,
};
