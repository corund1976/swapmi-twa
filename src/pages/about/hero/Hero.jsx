import s from './hero.module.css';

function Hero() {
  return (
    <section className={s.hero}>
      <div className={s.container}>
        <p className={s.title}>SwapmiOne</p>
        <p className={s.text}>
          A single SwapmiOne subscription provides access to all the services
          within the Swapmi ecosystem, including both existing services and new
          ones that are periodically added to the ecosystem.
        </p>
      </div>
    </section>
  );
}

export default Hero;
