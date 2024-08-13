import { useEffect, useState } from 'react';

import s from './btnScrollTop.module.css';

function BtnScrollTop() {
  const [scrollY, setScrollY] = useState(0);

  const buttonStyles = scrollY > 300 ? s.button : s.button_hidden;

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <button type="button" className={buttonStyles} onClick={scrollTop} />;
}

export default BtnScrollTop;
