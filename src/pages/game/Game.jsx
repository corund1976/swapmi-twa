import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BackButton } from '@twa-dev/sdk/react';

import appSelectors from 'redux/app/appSelectors';
import gameSelectors from 'redux/game/gameSelectors';

import RouteNames from 'router/routes';

import ModalRules from './modalRules';
import TimerScore from './timerScore';
import BubbleBlue1 from './bubbleBlue1';
import BubbleBlue2 from './bubbleBlue2';
import BubbleBlue3 from './bubbleBlue3';
import BubbleBlue4 from './bubbleBlue4';
import BubbleYellow1 from './bubbleYellow1';
import BubbleYellow2 from './bubbleYellow2';
import BubbleYellow3 from './bubbleYellow3';
import BubbleYellow4 from './bubbleYellow4';
import BubbleGreen1 from './bubbleGreen1';
import BubbleGreen2 from './bubbleGreen2';
import BubbleGreen3 from './bubbleGreen3';
import BubbleGreen4 from './bubbleGreen4';
import BubbleRed1 from './bubbleRed1';
import BubbleRed2 from './bubbleRed2';
import BubbleRed3 from './bubbleRed3';
import BubbleRed4 from './bubbleRed4';
import ModalResult from './modalResult';

import s from './game.module.css';

const GAME_TIMER = Number(import.meta.env.VITE_GAME_TIMER) || 30;

function Game() {
  const displayRules = useSelector(appSelectors.displayGameRules);
  const tickets = useSelector(gameSelectors.tickets);

  const navigate = useNavigate();

  const sectionRef = useRef();

  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);

  const [displayResult, setDisplayResult] = useState(false);

  const closeResult = () => {
    if (tickets > 0) {
      setDisplayResult(false);
      setTimer(GAME_TIMER);
      setScore(0);
    } else {
      setTimer(0);
      navigate(RouteNames.MAIN);
    }
  };

  const handleClickBack = () => {
    closeResult();
    navigate(`/`);
  };

  const handleClickGreenBubble = () => setScore(score + 1);
  const handleClickYellowBubble = () => setScore(score + 2);
  const handleClickBlueBubble = () => setScore(score + 3);
  const handleClicRedBubble = () => {
    if (score >= 5) setScore(score - 5);
    else setScore(0);

    sectionRef.current.classList.add('section-bg-animated-red');

    setTimeout(() => {
      sectionRef.current.classList.remove('section-bg-animated-red');
    }, 500);
  };

  useEffect(() => {
    const delayedAction = setTimeout(() => {
      if (!displayRules) {
        if (timer > 0) setTimer(timer - 1);
        else {
          setTimer(0);
          setDisplayResult(true);
        }
      }
    }, 1000);

    return () => clearTimeout(delayedAction);
  }, [displayRules, timer]);

  // Включаю таймер игры только когда есть Билеты и выключены модалки Правила и Результат
  useEffect(() => {
    if (!displayRules && !displayResult && Number(tickets) > 0)
      setTimer(GAME_TIMER);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayResult, displayRules, tickets]);

  // Если билеты кончились и выключена модалка Результат - ухожу на Главную
  useEffect(() => {
    if (!displayResult && Number(tickets) <= 0) navigate(RouteNames.MAIN);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayResult, tickets]);

  // useEffect(() => {
  //   const handleScroll = () => window.scrollTo(0, 0);

  //   window.addEventListener('scroll', handleScroll);

  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  return (
    <>
      <BackButton onClick={handleClickBack} />

      <section
        className={s.section}
        onScroll={() => window.scrollTo(0, 0)}
        ref={sectionRef}
      >
        <TimerScore timer={timer} score={score} />

        <div className={s.bg_top} />

        {timer > 0 && (
          <>
            <BubbleBlue1 onClick={handleClickBlueBubble} />
            <BubbleBlue2 onClick={handleClickBlueBubble} />
            <BubbleBlue3 onClick={handleClickBlueBubble} />
            <BubbleBlue4 onClick={handleClickBlueBubble} />
            <BubbleYellow1 onClick={handleClickYellowBubble} />
            <BubbleYellow2 onClick={handleClickYellowBubble} />
            <BubbleYellow3 onClick={handleClickYellowBubble} />
            <BubbleYellow4 onClick={handleClickYellowBubble} />
            <BubbleGreen1 onClick={handleClickGreenBubble} />
            <BubbleGreen2 onClick={handleClickGreenBubble} />
            <BubbleGreen3 onClick={handleClickGreenBubble} />
            <BubbleGreen4 onClick={handleClickGreenBubble} />
            <BubbleRed1 onClick={handleClicRedBubble} />
            <BubbleRed2 onClick={handleClicRedBubble} />
            <BubbleRed3 onClick={handleClicRedBubble} />
            <BubbleRed4 onClick={handleClicRedBubble} />
          </>
        )}
      </section>

      {displayRules && <ModalRules />}
      {displayResult && <ModalResult score={score} close={closeResult} />}
    </>
  );
}

export default Game;
