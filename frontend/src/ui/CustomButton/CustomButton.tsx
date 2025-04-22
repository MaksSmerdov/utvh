import React, { ButtonHTMLAttributes } from 'react';
import styles from './CustomButton.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, isActive, className, ...props }) => {
  const buttonClasses = `${styles['button']} ${isActive ? styles['active'] : ''} ${className || ''} btn-reset`;
  return (
    <button {...props} className={buttonClasses.trim()}>
      {children}
    </button>
  );
};
export default Button;
