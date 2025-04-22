import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './CustomAccordion.module.scss';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface DocumentationAccordionProps {
  accordionData: {
    [key: string]: { name: string; files: { type: string; href: string }[] }[];
  };
  titles: { [key: string]: string };
}

const CustomAccordion: React.FC<DocumentationAccordionProps> = ({ accordionData, titles }) => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const accordionItems: AccordionItem[] = Object.entries(accordionData).map(([key, items]) => ({
    id: key,
    title: titles[key] || key,
    content: (
      <ul className={styles['list-reset']}>
        {items.map((item, index) => (
          <li className={styles['accordion-item']} key={index}>
            <div className={styles['accordion-link']}>{item.name}</div>
            <div className={styles['accordion-link-container']}>
              {item.files.map((file, fileIndex) => (
                <a className={styles['accordion-link-download']} href={file.href} key={fileIndex} download>
                  Скачать {file.type}
                </a>
              ))}
            </div>
          </li>
        ))}
      </ul>
    ),
  }));

  const handleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={styles.accordionContainer}>
      {accordionItems.map((item) => (
        <Accordion key={item.id} expanded={expanded === item.id} onChange={handleChange(item.id)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${item.id}-content`}
            id={`${item.id}-header`}
            className={styles.accordionSummary}
          >
            {item.title}
          </AccordionSummary>
          <AccordionDetails className={styles.accordionDetails}>{item.content}</AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default CustomAccordion;
