import { NavLink } from 'react-router-dom';

import RouteNames from 'router/routes';

import Container from 'components/container';

import s from './footer.module.css';

function Footer() {
  const navlinkStyles = ({ isActive }) =>
    isActive ? s.navlink_active : s.navlink;
  return (
    <footer>
      <Container>
        <ul className={s.links_list}>
          <li>
            <NavLink to={RouteNames.MAIN} className={navlinkStyles}>
              <div className={s.home_img} />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={RouteNames.LEADERS} className={navlinkStyles}>
              <div className={s.leaders_img} />
              Leaderboard
            </NavLink>
          </li>
          <li>
            <NavLink to={RouteNames.FRIENDS} className={navlinkStyles}>
              <div className={s.friends_img} />
              Friends
            </NavLink>
          </li>
          <li>
            <NavLink to={RouteNames.ABOUT} className={navlinkStyles}>
              <div className={s.about_img} />
              SwapmiOne
            </NavLink>
          </li>
        </ul>
      </Container>
    </footer>
  );
}

export default Footer;
