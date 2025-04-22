import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import 'dayjs/locale/ru.js'
import React from 'react';
import styles from '../CustomInput/CustomInput.module.scss';

interface CustomDatePickerProps {
  label: string;
  value: Dayjs | null;
  onChange: (newValue: Dayjs | null) => void;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ label, value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ru'>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        className={`${styles['custom-input']}`}
      />
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
