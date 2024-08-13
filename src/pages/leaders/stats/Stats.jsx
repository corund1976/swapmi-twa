import { useSelector } from 'react-redux';

import leadersSelectors from 'redux/leaders/leadersSelectors';

import formatValue from 'utils/formatValue';

import cup from 'images/leaders/cup.webp';
import token from 'images/token.webp';

import s from './stats.module.css';

function Stats() {
  const fund = useSelector(leadersSelectors.fund);

  return (
    <ul className={s.stats_list}>
      <li>
        <p className={s.label}>Top</p>
        <div className={s.value}>
          <img src={cup} alt="cup" />
          30
        </div>
      </li>
      <li>
        <p className={s.label}>Prize fund</p>
        <div className={s.value}>
          <img src={token} alt="token" />
          {formatValue(fund)}
        </div>
      </li>
    </ul>
  );
}

export default Stats;
