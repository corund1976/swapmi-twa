import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import userSelectors from 'redux/user/userSelectors';
import leadersSelectors from 'redux/leaders/leadersSelectors';

import formatValue from 'utils/formatValue';

import avatarDefault from 'images/avatar-default.svg';
import token from 'images/token.webp';
import round from 'images/round.webp';

import s from './top3.module.css';

function Top3() {
  const user = useSelector(userSelectors.user);
  const leaders = useSelector(leadersSelectors.list);

  const [top3, setTop3] = useState();

  useEffect(() => {
    if (leaders) {
      setTop3([
        leaders.find(({ rang }) => rang === 2),
        leaders.find(({ rang }) => rang === 1),
        leaders.find(({ rang }) => rang === 3),
      ]);
    }
  }, [leaders]);

  return (
    <ul className={s.block_top3}>
      {top3 &&
        top3.map(({ id, avatar, name, spim, rounds }) => (
          <li key={id}>
            <img
              src={avatar || avatarDefault}
              alt="avatar"
              className={s.avatar}
            />

            <p className={s.name}>{name}</p>

            <div className={s.week}>
              <p className={s.label}>Week:</p>
              <img src={token} alt="token" className={s.token_img} />
              <p className={s.value}>{formatValue(spim)}</p>
            </div>

            <div className={s.rounds}>
              <p className={s.label}>Rounds:</p>
              <img src={round} alt="round" className={s.round_img} />
              <p className={s.value}>{formatValue(rounds)}</p>
            </div>

            {user?.id === id && <p className={s.you}>you</p>}
          </li>
        ))}
    </ul>
  );
}

export default Top3;
