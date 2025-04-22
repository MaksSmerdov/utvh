import React from 'react';
import { FaArrowLeft, FaArrowRight, FaEye, FaEyeSlash, FaSync } from 'react-icons/fa';
import Button from '../../../../ui/CustomButton/CustomButton.tsx';
import styles from '../../Chart.module.scss';

export interface ControlChartButtonsProps {
  onBackward?: () => void;
  onForward?: () => void;
  onToggleAll: () => void;
  onReturnToCurrent: () => void;
  allHidden: boolean;
}

const ControlChartButtons: React.FC<ControlChartButtonsProps> = ({
                                                                   onBackward,
                                                                   onForward,
                                                                   onToggleAll,
                                                                   onReturnToCurrent,
                                                                   allHidden,
                                                                 }) => {
  return (
    <div className={styles['dynamic-graph__btns']}>
      {onBackward && (
        <Button onClick={onBackward}>
          <FaArrowLeft />
          Назад
        </Button>
      )}
      {onForward && (
        <Button onClick={onForward}>
          <FaArrowRight />
          Вперёд
        </Button>
      )}
      <Button onClick={onToggleAll}>
        {allHidden ? <FaEyeSlash /> : <FaEye />}
        {allHidden ? 'Показать все' : 'Скрыть все'}
      </Button>
      <Button onClick={onReturnToCurrent}>
        <FaSync />
        Вернуться к текущим данным
      </Button>
    </div>
  );
};

export default ControlChartButtons;
