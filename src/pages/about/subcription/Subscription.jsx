import points from './points';

import s from './subscription.module.css';

function Subscription() {
  return (
    <section className={s.subscription}>
      <div className={s.container}>
        <div className={s.block}>
          <div className={s.title_wrapper}>
            <p className={s.title}>Swapmi One</p>
            <div className={s.price}>
              <p>20 USDT</p>
              <p>2 000 SPIM</p>
            </div>
          </div>
          <ul className={s.points_list}>
            {points.map(({ id, soon, title, text }) => (
              <li key={id} className={soon ? s.item_soon : s.item}>
                <p className={s.name}>{title}</p>
                <p className={s.text}>{text}</p>
              </li>
            ))}
          </ul>
          <a
            href="https://test.swapmi.pro/tariffs"
            target="_blank"
            rel="noopener noreferrer"
            className={s.btn_subscribe}
          >
            subscribe
          </a>
        </div>
      </div>
    </section>
  );
}

export default Subscription;
