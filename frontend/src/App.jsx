import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout.jsx';
import HomePage from './pages/HomePage.jsx';
import MapPage from './pages/MapPage.jsx';
import HistoryPage from './pages/HistoryPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
}
