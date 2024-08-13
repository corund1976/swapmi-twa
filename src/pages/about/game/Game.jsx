import { Link } from 'react-router-dom';

import RouteNames from 'router/routes';

import s from './game.module.css';

function Game() {
  return (
    <section className={s.game}>
      <div className={s.container}>
        <div className={s.block}>
          <p className={s.title}>Bubble killer</p>
          <p className={s.text}>
            You can not only buy a SwapmiOne subscription with USDT, but also
            earn it in our game Bubble Killer. Pop bubbles, earn our internal
            token SPIM, transfer it to your account balance, and purchase a
            subscription.
          </p>
          <Link to={`/${RouteNames.GAME}`} className={s.btn_play}>
            play now
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Game;
