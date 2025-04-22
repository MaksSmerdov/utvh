import { Navigate, Route, Routes } from 'react-router-dom';
import CurrentBoiler from '../pages/Boiler/CurrentBoiler/CurrentBoiler.tsx';
import MnemoBoiler from '../pages/Boiler/MnemoBoiler/MnemoBoiler.tsx';
import CurrentHvoFirst from '../pages/HvoFirst/CurrentHvoFirst/CurrentHvoFirst.tsx';
import CurrentHvoSecond from '../pages/HvoSecond/CurrentHvoSecond/CurrentHvoSecond.tsx';
import MnemoHvoFirst from '../pages/HvoFirst/MnemoHvoFirst/MnemoHvoFirst.tsx';
import MnemoHvoSecond from '../pages/HvoSecond/MnemoHvoSecond/MnemoHvoSecond.tsx';
import ChartRoutes from './ChartRoutes.tsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/boiler/:id/current" element={<CurrentBoiler />} />
      <Route path="/boiler/:id/mnemo" element={<MnemoBoiler />} />
      <Route path="/hvo/1/current" element={<CurrentHvoFirst />} />
      <Route path="/hvo/2/current" element={<CurrentHvoSecond />} />
      <Route path="/hvo/1/mnemo" element={<MnemoHvoFirst />} />
      <Route path="/hvo/2/mnemo" element={<MnemoHvoSecond />} />

      {ChartRoutes()}
      <Route path="*" element={<Navigate to="/boiler/1/current" replace />} />
    </Routes>
  );
};

export default AppRoutes;
