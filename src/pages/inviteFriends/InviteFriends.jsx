import { useState } from 'react';
import { useSelector } from 'react-redux';

import balanceSelectors from 'redux/balance/balanceSelectors';

import Container from 'components/container';

import BlockTop from './blockTop';
import Friends from './friends';
import BtnScrollTop from './btnScrollTop';
import Invite from './invite';
import ModalInfo from './modalInfo';
import ModalTransfer from './modalTransfer';

import s from './inviteFriends.module.css';

function InviteFriends() {
  const transferStatus = useSelector(balanceSelectors.transferStatus);

  const [displayInfo, setDisplayInfo] = useState(false);
  const toggleInfo = () => setDisplayInfo(!displayInfo);

  return (
    <>
      <section className={s.section}>
        <Container>
          <div className={s.wrapper}>
            <BlockTop toggleInfo={toggleInfo} />
          </div>
          <Friends />
          <BtnScrollTop />
          <Invite />
        </Container>
      </section>

      {displayInfo && <ModalInfo close={toggleInfo} />}
      {transferStatus === 'success' && <ModalTransfer />}
    </>
  );
}

export default InviteFriends;
