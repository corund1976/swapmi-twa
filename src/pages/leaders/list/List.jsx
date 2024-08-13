import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import userSelectors from 'redux/user/userSelectors';
import leadersSelectors from 'redux/leaders/leadersSelectors';

import formatValue from 'utils/formatValue';

import avatarDefault from 'images/avatar-default.svg';
import token from 'images/token.webp';
import round from 'images/round.webp';

import s from './list.module.css';

function List() {
  const user = useSelector(userSelectors.user);
  const list = useSelector(leadersSelectors.list);

  const [filteredList, setFilteredList] = useState();
  const [userItem, setUserItem] = useState();

  useEffect(() => {
    if (user && list) {
      const listWithoutTop3AndUser = list.filter(
        ({ rang, user_id }) =>
          rang !== 2 && rang !== 1 && rang !== 3 && user_id !== user.id,
      );

      setFilteredList(listWithoutTop3AndUser);

      const userData = list.find(({ id, rang }) => id === user.id && rang >= 4);

      setUserItem(userData);
    }
  }, [list, user]);

  return (
    <ul className={s.list}>
      {userItem && (
        <li className={s.user_item}>
          <p className={s.position}>{userItem?.rang}</p>
          <img
            src={userItem?.avatar || avatarDefault}
            alt="avatar"
            className={s.avatar}
          />
          <div>
            <p className={s.name}>{userItem?.name}</p>
            <p className={s.you}>you</p>
            <div className={s.week_rounds_wrapper}>
              <p className={s.label}>Week:</p>
              <img src={token} alt="token" className={s.token_img} />
              <p className={s.value}>{formatValue(userItem?.spim)}</p>
              <div className={s.gap} />
              <p className={s.label}>Rounds:</p>
              <img src={round} alt="round" className={s.round_img} />
              <p className={s.value}>{formatValue(userItem?.rounds)}</p>
            </div>
          </div>
        </li>
      )}

      {filteredList &&
        filteredList.map(({ id, name, rang, avatar, spim, rounds }) => (
          <li key={id} className={s.other_items}>
            <p className={s.position}>{rang}</p>
            <img
              src={avatar || avatarDefault}
              alt="avatar"
              className={s.avatar}
            />
            <div>
              <p className={s.name}>{name}</p>
              <div className={s.week_rounds_wrapper}>
                <p className={s.label}>Week:</p>
                <img src={token} alt="token" className={s.token_img} />
                <p className={s.value}>{formatValue(spim)}</p>
                <div className={s.gap} />
                <p className={s.label}>Rounds:</p>
                <img src={round} alt="round" className={s.round_img} />
                <p className={s.value}>{formatValue(rounds)}</p>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
}

export default List;
