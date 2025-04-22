import styles from './ErrorMessage.module.scss';

interface ErrorProps {
  className?: string;
}

const ErrorMessage = ({ className }: ErrorProps) => {
  return (
    <div className={`${styles['error-message']} ${className || ''}`}>Ошибка получения данных</div>
  );
};
export default ErrorMessage;
