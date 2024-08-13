import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import authSelectors from 'redux/auth/authSelectors';

import leadersOperations from 'redux/leaders/leadersOperations';

// import useSwipeDetection from 'hooks/useSwipeDetection';

import Container from 'components/container';

import Stats from './stats';
import Top3 from './top3';
import List from './list';
import BtnScrollTop from './btnScrollTop';
import ModalInfo from './modalInfo';

import s from './leaders.module.css';

function Leaders() {
  const dispatch = useDispatch();
  const isAuth = useSelector(authSelectors.isAuthorized);

  const [displayInfo, setDisplayInfo] = useState(false);
  const toggleInfo = () => setDisplayInfo(!displayInfo);

  useEffect(() => {
    if (isAuth) dispatch(leadersOperations.getLeadersboard());
  }, [dispatch, isAuth]);

  // const { swipeVertical } = useSwipeDetection();

  // const wrapperStyles = swipeVertical === 'up' ? s.wrapper_hidden : s.wrapper;

  return (
    <>
      <section className={s.section}>
        <Container>
          {/* <div className={wrapperStyles}> */}
          <div className={s.wrapper}>
            <div className={s.title}>
              Leaderboard
              <button
                type="button"
                onClick={toggleInfo}
                className={s.btn_info}
              />
            </div>

            <Stats />
            <Top3 />
          </div>
          <List />

          <BtnScrollTop />
        </Container>
      </section>

      {displayInfo && <ModalInfo close={toggleInfo} />}
    </>
  );
}

export default Leaders;
