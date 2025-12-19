import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { CepSearch } from '../pages/CepSearch';
import { Noticias } from '../pages/Noticias';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/cep" replace />} />
          <Route path="/cep" element={<CepSearch />} />
          <Route path="/noticias" element={<Noticias />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
