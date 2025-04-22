import React from 'react';
import Valve from '../../../../../components/Valve/Valve.tsx';
import styles from './styles/ValveDisplayBoiler.module.scss';

interface ValveDisplayProps {
  valveStatus: boolean;
}

const ValveDisplayBoiler: React.FC<ValveDisplayProps> = ({ valveStatus }) => {
  return (
    <>
      <div className={`${styles['mnemo__valve']} ${styles['mnemo__valve-1']}`}>
        <Valve orientation="horizontal" status={valveStatus} />
      </div>
      <div className={`${styles['mnemo__valve']} ${styles['mnemo__valve-2']}`}>
        <Valve status={valveStatus} />
      </div>
      <div className={`${styles['mnemo__valve']} ${styles['mnemo__valve-3']}`}>
        <Valve status={valveStatus} />
      </div>
      <div className={`${styles['mnemo__valve']} ${styles['mnemo__valve-4']}`}>
        <Valve reverseColorLogic={true} status={valveStatus} />
      </div>
    </>
  );
};

export default ValveDisplayBoiler;
