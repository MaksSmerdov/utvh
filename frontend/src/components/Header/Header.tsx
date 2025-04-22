import React from 'react';
import styles from './header.module.scss';
import Timer from './Timer';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className={styles.header}>
      <div className={styles.header__title}>
        <span className={styles.header__titleSpan}>УТВХ</span>
        {title}
      </div>
      <div className={styles.header__box}>
        <Timer />
      </div>
    </div>
  );
};

export default Header;
