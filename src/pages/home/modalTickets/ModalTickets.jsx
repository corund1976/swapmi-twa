import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import WebApp from '@twa-dev/sdk';

import userSelectors from 'redux/user/userSelectors';

import { setDisplayModal } from 'redux/app/appSlice';

import useOutsideClick from 'hooks/useOutsideClick';

import Backdrop from 'components/backdrop';

import s from './modalTickets.module.css';

function ModalTickets({ close }) {
  const dispatch = useDispatch();
  const user = useSelector(userSelectors.user);

  const modalRef = useRef();

  const [displayTickets, setDisplayTickets] = useState(false);

  const closeModal = () => {
    dispatch(setDisplayModal(false));

    setDisplayTickets(false);

    close();
  };

  const inviteFreinds = () => {
    const url = user?.refLink;
    const text =
      'Play with me and get access to awesome crypto bots on the smart auto-trading platform Swapmi.';

    // https://t.me/share/url?url={url}&text={text}
    // https://telegram.me/share/url?url={url}&text={text}
    // tg://msg_url?url={url}&text={text}
    WebApp.openTelegramLink(`https://t.me/share/url?url=${url}&text=${text}`);
  };

  useEffect(() => {
    dispatch(setDisplayModal(true));

    setDisplayTickets(true);
  }, [dispatch]);

  useOutsideClick(modalRef, closeModal, displayTickets);

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
        <p className={s.title}>You have run out of tickets</p>
        <p className={s.text}>
          You can invite friends and get tickets for them, or try it tomorrow
        </p>
        <button type="button" onClick={inviteFreinds} className={s.btn_main}>
          invite friends
        </button>
        <button type="button" onClick={closeModal} className={s.btn_scnd}>
          close
        </button>
      </section>
    </Backdrop>
  );
}

export default ModalTickets;

ModalTickets.propTypes = {
  close: PropTypes.func.isRequired,
};
