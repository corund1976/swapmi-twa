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
          <p className={s.title}>Farming</p>
          <p className={s.text}>
            Farming lasts for 24 hours at a rate of 10% per day, which equals
            0.41% per hour. Once farming starts, the system locks the amount in
            the game balance, from which the farming reward will be calculated.
            At 00:00 UTC, farming ends, and the rewards are distributed. To
            restart farming, it is necessary to claim the reward from the
            previous farming period and start the process again.
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
