import React, { useEffect, useState } from 'react';
import styles from './Valve.module.scss';

export interface ValveProps {
  size?: { width: number; height: number };
  status?: boolean;
  value?: number;
  threshold?: number;
  reverseColorLogic?: boolean;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

const Valve: React.FC<ValveProps> = ({
                                       size = { width: 30, height: 24 },
                                       status,
                                       value,
                                       threshold = 5,
                                       reverseColorLogic = false,
                                       orientation = 'vertical',
                                     }) => {
  const [color, setColor] = useState<string>('red');

  useEffect(() => {
    if (status !== undefined) {
      setColor(reverseColorLogic ? (status ? 'red' : 'green') : status ? 'green' : 'red');
    } else if (value !== undefined) {
      setColor(
        reverseColorLogic
          ? value > threshold
            ? 'red'
            : 'green'
          : value > threshold
            ? 'green'
            : 'red',
      );
    }
  }, [status, value, threshold, reverseColorLogic]);

  const transformStyle = orientation === 'vertical' ? { transform: 'rotate(90deg)' } : {};
  const triangleHeight = size.height / 2;

  return (
    <div
      style={{
        ...transformStyle,
        width: size.width,
        height: size.height,
      }}
      className={styles['mnemo__valve-box']}>
      <div
        className={styles['mnemo__triangle1']}
        style={{
          borderTop: `${triangleHeight}px solid transparent`,
          borderLeft: `${size.width / 2}px solid ${color}`,
          borderBottom: `${triangleHeight}px solid transparent`,
        }}
      />
      <div
        className={styles['mnemo__triangle2']}
        style={{
          borderTop: `${triangleHeight}px solid transparent`,
          borderRight: `${size.width / 2}px solid ${color}`,
          borderBottom: `${triangleHeight}px solid transparent`,
        }}
      />
    </div>
  );
};

export default Valve;
