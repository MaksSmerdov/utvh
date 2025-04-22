import React from 'react';
import { LabelItem } from '../../types/interface.ts';

interface StaticDisplayProps {
  labels: LabelItem[];
}

const StaticDisplay: React.FC<StaticDisplayProps> = ({ labels }) => {
  return (
    <>
      {labels.map((label, index) => (
        <p key={index} className={`mnemo__param-descr ${label.className}`}>
          {label.text}
        </p>
      ))}
    </>
  );
};

export default StaticDisplay;
