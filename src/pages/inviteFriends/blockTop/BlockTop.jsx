import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PropTypes from 'prop-types';

import friendsSelectors from 'redux/friends/friendsSelectors';
import balanceSelectors from 'redux/balance/balanceSelectors';
import farmingSelectors from 'redux/farming/farmingSelectors';

import { setTransferStatus } from 'redux/balance/balanceSlice';

import balanceOperations from 'redux/balance/balanceOperations';

import ticket from 'images/ticket.webp';
import token from 'images/token.webp';

import s from './blockTop.module.css';

const formatValue = (value) => {
  if (value % 1 === 0) return value;
  else return Math.ceil(value * 100) / 100;
};

function BlockTop({ toggleInfo }) {
  const dispatch = useDispatch();
  const ticketsReward = useSelector(friendsSelectors.ticketsReward);
  const tokensReward = useSelector(friendsSelectors.tokensReward);
  const transferStatus = useSelector(balanceSelectors.transferStatus);
  const isFarming = useSelector(farmingSelectors.isFarming);

  const transferRewards = () => {
    if (isFarming) {
      Notify.warning(
        'The reward transfer is not possible because farming is in progress. Please transfer after farming ends.',
      );
      return;
    }

    if (tokensReward || ticketsReward)
      dispatch(balanceOperations.transferRewards());
    else Notify.warning('No rewards to transfer');
  };

  useEffect(() => {
    if (transferStatus === 'no rewards to transfer') {
      Notify.warning('No rewards to transfer');
      dispatch(setTransferStatus(null));
    }
  }, [dispatch, transferStatus]);

  return (
    <>
      <div className={s.title}>
        Invite friends
        <button type="button" onClick={toggleInfo} className={s.btn_info} />
      </div>

      <ul className={s.block}>
        <li>
          <p className={s.label}>Tokens reward:</p>
          <div>
            <img src={token} alt="token" />
            <p>{formatValue(tokensReward)}</p>
          </div>
        </li>
        <li>
          <p className={s.label}>Tickets reward:</p>
          <div>
            <img src={ticket} alt="ticket" />
            <p>{ticketsReward}</p>
          </div>
        </li>
      </ul>
      <button
        type="button"
        onClick={transferRewards}
        className={s.btn_transfer}
      >
        <div className={s.btn_bgi} />
        transfer
      </button>
    </>
  );
}

export default BlockTop;

BlockTop.propTypes = {
  toggleInfo: PropTypes.func.isRequired,
};
