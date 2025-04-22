import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import React from 'react';

interface TooltipWrapperProps {
  title?: string;
  children: React.ReactNode;
}

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow placement="top" classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: 'green',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'green',
    color: 'white',
    fontSize: '14px',
    fontWeight: '600',
    fontFamily: 'Bitter',
    border: '1px solid black',
    textAlign: 'center',
    whiteSpace: 'pre-line',
    maxWidth: 200,
  },
}));

export default function TooltipWrapper({ title, children }: TooltipWrapperProps) {
  if (!title) {
    return <>{children}</>;
  }
  const validChild = React.isValidElement(children) ? children : <span>{children}</span>;
  return <CustomTooltip title={title}>{validChild}</CustomTooltip>;
}
