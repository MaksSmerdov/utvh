import React from 'react';

export interface GifComponentProps {
  src: string;
  className: string;
  value: number | boolean;
  conditionType?: 'boolean' | 'greaterThan' | 'lessThan' | 'equals';
  compareValue?: number;
  isAnimation?: boolean;
}

const GifComponent: React.FC<GifComponentProps> = ({
                                                     src,
                                                     className,
                                                     value,
                                                     conditionType = 'boolean',
                                                     compareValue,
                                                     isAnimation = false,
                                                   }) => {
  let isActive = false;

  switch (conditionType) {
    case 'boolean':
      isActive = value === true;
      break;
    case 'greaterThan':
      isActive = parseFloat(String(value)) > (compareValue as number);
      break;
    case 'lessThan':
      isActive = parseFloat(String(value)) < (compareValue as number);
      break;
    case 'equals':
      isActive = value === compareValue;
      break;
    default:
      isActive = false;
  }

  return (
    <img
      src={src}
      alt={src}
      className={className}
      style={{
        display: isAnimation || isActive ? 'block' : 'none',
        animationPlayState: isActive ? 'running' : 'paused',
      }}
    />
  );
};

export default GifComponent;
