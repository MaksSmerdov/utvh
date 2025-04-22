import { Tab, Tabs } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppRoutes from '../../routes/AppRoutes';
import Button from '../../ui/CustomButton/CustomButton';
import styles from './HomePage.module.scss';
import { subtabsConfig } from './subTabConfig';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const primaryTab = (() => {
    if (location.pathname.startsWith('/boiler/1')) return 'boiler/1';
    if (location.pathname.startsWith('/boiler/2')) return 'boiler/2';
    if (location.pathname.startsWith('/boiler/3')) return 'boiler/3';

    if (location.pathname.startsWith('/hvo/1')) return 'hvo/1';
    if (location.pathname.startsWith('/hvo/2')) return 'hvo/2';
    return 'boiler/1';
  })();

  const group = primaryTab.includes('/') ? primaryTab.split('/')[0] : primaryTab;
  const currentSubtabs = subtabsConfig[group];
  const pathParts = location.pathname.split('/');
  const activeSubtab = pathParts[pathParts.length - 1];

  const handlePrimaryChange = (_: React.SyntheticEvent, newValue: string) => {
    navigate(`/${newValue}/current`);
  };

  const handleSubChange = (newValue: string) => {
    navigate(`/${primaryTab}/${newValue}`);
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className={styles['home-container']}>
      <Tabs className={styles.customTabs} value={primaryTab} onChange={handlePrimaryChange}>
        <Tab className={styles.customTab} label="Котел №1" value="boiler/1" />
        <Tab className={styles.customTab} label="Котел №2" value="boiler/2" />
        <Tab className={styles.customTab} label="Котел №3" value="boiler/3" />
        <Tab className={styles.customTab} label="ХВО №1" value="hvo/1" />
        <Tab className={styles.customTab} label="ХВО №2" value="hvo/2" />
      </Tabs>

      <div className={styles['subtabs-container']}>
        {currentSubtabs.map((tab) => (
          <Button
            key={tab.value}
            isActive={activeSubtab === tab.value}
            onClick={() => handleSubChange(tab.value)}>
            {tab.icon}
            {tab.label}
          </Button>
        ))}
      </div>

      <motion.div className={styles['content-container']} transition={{ duration: 1 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate">
            <AppRoutes />
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
export default HomePage;
