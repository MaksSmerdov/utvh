import { Box, IconButton, Modal, ModalProps, Typography } from '@mui/material';
import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface CustomModalProps extends Omit<ModalProps, 'children'> {
  title?: string;
  width?: string;
  children: React.ReactNode;
}


const CustomModal: React.FC<CustomModalProps> = ({
                                                   open,
                                                   onClose,
                                                   title,
                                                   width = '700px',
                                                   children,
                                                   ...rest
                                                 }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      slotProps={{
        backdrop: {
          style: { cursor: 'pointer' },
        },
      }}
      {...rest}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'background.paper',
          boxShadow: 24,
          outline: 'none',
          borderRadius: 1,
          width,
          maxHeight: '90vh',
          overflowY: 'auto',
          fontFamily: 'Bitter, sans-serif',
          '& .MuiTypography-root': {
            fontFamily: 'inherit',
          },
        }}>
        <Box
          sx={{
            position: 'relative',
            margin: 1,
            padding: 2,
            borderBottom: '1px solid #e0e0e0',
          }}>
          {title && (
            <Typography variant="h6" component="div">
              {title}
            </Typography>
          )}
          <IconButton
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              onClose && onClose(e, 'backdropClick')
            }
            sx={{ position: 'absolute', top: 8, right: 8 }}
            aria-label="close">
            <FaTimes />
          </IconButton>
        </Box>
        <Box sx={{ padding: 2 }}>{children}</Box>
      </Box>
    </Modal>
  );
};

export default CustomModal;
