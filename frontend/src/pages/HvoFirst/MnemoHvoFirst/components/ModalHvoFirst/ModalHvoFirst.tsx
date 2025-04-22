import React from 'react';
import CustomModal from '../../../../../ui/CustomModal/CustomModal';
import CustomAccordion from '../../../../../ui/CustomAccordion/CustomAccordion.tsx';
import { accordionDataHvo1, accordionTitles } from './accordionItems.ts';
import { ModalDocumentationProps } from '../../../../../types/interface.ts';

const ModalHvoFirst: React.FC<ModalDocumentationProps> = ({ open, onClose }) => {
  return (
    <CustomModal open={open} onClose={onClose} title="Документация">
      <CustomAccordion accordionData={accordionDataHvo1} titles={accordionTitles} />
    </CustomModal>
  );
};

export default ModalHvoFirst;
