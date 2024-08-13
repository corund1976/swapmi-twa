import { useSelector } from 'react-redux';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import WebApp from '@twa-dev/sdk';

import appSelectors from 'redux/app/appSelectors';
import userSelectors from 'redux/user/userSelectors';

import s from './invite.module.css';

function Invite() {
  const user = useSelector(userSelectors.user);
  const platform = useSelector(appSelectors.platform);

  const copyReflink = () => {
    if (user?.refLink) {
      Notify.success('Invite message copied!');
      navigator.clipboard.writeText(user.refLink);
    }
  };

  const inviteFriends = () => {
    const url = user.refLink;
    const text =
      'Play with me and get access to awesome crypto bots on the smart auto-trading platform Swapmi.';

    // https://t.me/share/url?url={url}&text={text}
    // https://telegram.me/share/url?url={url}&text={text}
    // tg://msg_url?url={url}&text={text}
    WebApp.openTelegramLink(`https://t.me/share/url?url=${url}&text=${text}`);
  };

  const wrapperStyles = platform === 'ios' ? s.wrapper_ios : s.wrapper;

  return (
    <div className={wrapperStyles}>
      <button type="button" onClick={inviteFriends} className={s.btn_invite}>
        invite friends
      </button>
      <button type="button" onClick={copyReflink} className={s.btn_copy} />
    </div>
  );
}

export default Invite;
