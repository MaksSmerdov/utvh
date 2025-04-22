import React from 'react';
import { ModalDocumentationProps } from '../../../../../types/interface.ts';
import CustomModal from '../../../../../ui/CustomModal/CustomModal.tsx';
import CustomAccordion from '../../../../../ui/CustomAccordion/CustomAccordion.tsx';
import { accordionDataHvo2, accordionTitles } from './accordionItems.ts';

const ModalHvoSecond: React.FC<ModalDocumentationProps> = ({ open, onClose }) => {
  return (
    <CustomModal open={open} onClose={onClose} title="Документация">
      <CustomAccordion accordionData={accordionDataHvo2} titles={accordionTitles} />
    </CustomModal>
  );
};

export default ModalHvoSecond;
