import React from 'react';
import styles from './styles/SymbolsDisplayHvoFirst.module.scss';

const symbols = [
  { id: 1, image: '/img/hvo/mnemo-symbols/1.png', description: 'Вода исходная (речная)' },
  { id: 2, image: '/img/hvo/mnemo-symbols/2.png', description: 'Вода промывки фильтров' },
  { id: 3, image: '/img/hvo/mnemo-symbols/3.png', description: 'Канализация' },
  { id: 4, image: '/img/hvo/mnemo-symbols/4.png', description: 'Вода осветленная' },
  { id: 5, image: '/img/hvo/mnemo-symbols/5.png', description: 'Вода осветленная' },
];

const SymbolsDisplayHvoFirst: React.FC = () => {
  return (
    <div className={styles['mnemo__symbols']}>
      <h3 className={styles['mnemo__symbols-title']}>Условные обозначения</h3>

      {symbols.map((symbol) => (
        <div className={styles['mnemo__symbols-item']} key={symbol.id}>
          <img
            src={symbol.image}
            alt={symbol.description}
            className={`${styles['mnemo__symbols-name']} ${styles[`mnemo__symbols-name-${symbol.id}`]}`}
          />
          <p className={styles['mnemo__symbols-descr']}>{symbol.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SymbolsDisplayHvoFirst;