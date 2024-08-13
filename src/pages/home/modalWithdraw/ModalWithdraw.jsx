import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types';

import balanceSelectors from 'redux/balance/balanceSelectors';

import { setDisplayModal } from 'redux/app/appSlice';
import { setWithdrawStatus } from 'redux/balance/balanceSlice';

import balanceOperations from 'redux/balance/balanceOperations';

import useOutsideClick from 'hooks/useOutsideClick';

import Backdrop from 'components/backdrop';
import Input from 'ui/input';

import s from './modalWithdraw.module.css';

function ModalWithdraw({ close }) {
  const dispatch = useDispatch();
  const tokens = useSelector(balanceSelectors.tokens);
  const withdrawStatus = useSelector(balanceSelectors.withdrawStatus);

  const modalRef = useRef();

  const [displayWithdraw, setDisplayWithdraw] = useState(false);

  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!amount) {
      Notify.warning('Enter amount!');
      return;
    }

    if (Number(amount) > tokens) {
      Notify.warning('Amount exceeds balance!');
      return;
    }

    if (!email) {
      Notify.warning('Enter email!');
      return;
    }

    const data = {
      amount: Number(amount),
      email,
    };

    dispatch(balanceOperations.withdraw(data));
  };

  const closeModal = () => {
    dispatch(setDisplayModal(false));
    dispatch(setWithdrawStatus(null));

    setDisplayWithdraw(false);
    setAmount('');

    close();
  };

  const setMax = () => setAmount(tokens.toString());

  useEffect(() => {
    dispatch(setDisplayModal(true));

    setDisplayWithdraw(true);
  }, [dispatch]);

  useOutsideClick(modalRef, closeModal, displayWithdraw);

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
        {withdrawStatus === 'success' ? (
          <>
            <p className={s.title}>Funds have been successfully transferred!</p>
            <p className={s.text}>
              The funds have been transferred to the account in the personal
              account of the swapmi website!
            </p>
            <button type="button" onClick={closeModal} className={s.btn_ok}>
              continue
            </button>
          </>
        ) : (
          <>
            <p className={s.title}>Withdrawal</p>
            <p className={s.text}>Enter the amount to withdraw</p>
            <form onSubmit={handleSubmit} className={s.form}>
              <div className={s.input_wrapper}>
                <Input
                  id="withdrawInputAmount"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={setAmount}
                />
                <button type="button" onClick={setMax} className={s.btn_max}>
                  max
                </button>
              </div>
              <Input
                type="email"
                id="withdrawInputEmail"
                placeholder="Enter Swapmi email"
                value={email}
                onChange={setEmail}
              />
              <button type="submit" className={s.btn_ok}>
                complete
              </button>
            </form>
          </>
        )}
      </section>
    </Backdrop>
  );
}

export default ModalWithdraw;

ModalWithdraw.propTypes = {
  close: PropTypes.func.isRequired,
};
