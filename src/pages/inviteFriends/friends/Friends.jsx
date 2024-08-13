import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import authSelectors from 'redux/auth/authSelectors';
import friendsSelectors from 'redux/friends/friendsSelectors';

import friendsOperations from 'redux/friends/friendsOperations';

import formatValue from 'utils/formatValue';

import avatarDefault from 'images/avatar-default.svg';
import ticket from 'images/ticket.webp';
import token from 'images/token.webp';

import Input from 'ui/input';

import s from './friends.module.css';

function Friends() {
  const dispatch = useDispatch();
  const isAuth = useSelector(authSelectors.isAuthorized);
  const list = useSelector(friendsSelectors.list);

  const [search, setSearch] = useState('');

  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    if (isAuth && !list) dispatch(friendsOperations.getFriendsList());
  }, [dispatch, isAuth, list]);

  useEffect(() => {
    if (list) {
      if (search)
        setFilteredList(
          list.filter(({ username }) =>
            username.toLowerCase().includes(search.toLowerCase()),
          ),
        );
      else setFilteredList(list);
    }
  }, [list, search]);

  return (
    list &&
    list.length > 0 && (
      <>
        <Input
          id="inviteInputSearch"
          placeholder="&#128270; Search by name"
          value={search}
          onChange={setSearch}
        />
        <ul className={s.friends_list}>
          {filteredList.map(({ id, username, avatar, spim, tickets }) => (
            <li key={id}>
              <img
                src={avatar || avatarDefault}
                alt="avatar"
                className={s.avatar}
              />
              <div>
                <p className={s.name}>{username}</p>
                <ul className={s.reward_tickets_wrapper}>
                  <li>
                    <p className={s.label}>Reward:</p>
                    <img src={token} alt="token" />
                    <p className={s.value}>{formatValue(spim).toFixed(2)}</p>
                  </li>
                  <li>
                    <p className={s.label}>Tickets:</p>
                    <img src={ticket} alt="ticket" />
                    <p className={s.value}>{formatValue(tickets)}</p>
                  </li>
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </>
    )
  );
}

export default Friends;
