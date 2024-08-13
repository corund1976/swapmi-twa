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
          <p className={s.title}>Leaderboard rules</p>
          <p className={s.text}>
            Every Monday at 00:00 UTC, a prize pool of 7000 SPIM is distributed
            among the top 30 users who have earned the most SPIM tokens in the
            game `Bubble Killer` over the past week. The prize pool is
            distributed as follows:
            <br />
            - 1st place - 1500 SPIM
            <br />
            - 2nd place - 1000 SPIM
            <br />
            - 3rd place - 700 SPIM
            <br />
            - 4th place - 500 SPIM
            <br />
            5th place - 300 SPIM
            <br />
            From 6th to 30th place, each user receives 120 SPIM credited to
            their game balance.
            <br />
            The rewards are credited to the user`s game balance. The new prize
            draw starts immediately after the distribution at 00:01 UTC. You can
            track your current position in the draw in the `Leaderboard`
            section, where your current position will be displayed at the top of
            the leaderboard with the label `You`. In the leaderboard, besides
            your current position, you can also see the number of tokens earned
            and the number of rounds played in `Bubble Killer`.
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
