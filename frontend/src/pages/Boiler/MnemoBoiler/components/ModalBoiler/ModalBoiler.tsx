import React from 'react';
import CustomModal from '../../../../../ui/CustomModal/CustomModal';
import CustomAccordion from '../../../../../ui/CustomAccordion/CustomAccordion.tsx';
import { accordionData, accordionTitles } from './accordionData.ts';
import { ModalDocumentationProps } from '../../../../../types/interface.ts';

const ModalBoiler: React.FC<ModalDocumentationProps> = ({ open, onClose }) => {
  const modalContainerRef = React.useRef(null);
  return (
    <>
      <div ref={modalContainerRef} />
      <CustomModal open={open} onClose={onClose} title="Документация">
        <CustomAccordion accordionData={accordionData} titles={accordionTitles} />
      </CustomModal>
    </>
  );
};

export default ModalBoiler;
