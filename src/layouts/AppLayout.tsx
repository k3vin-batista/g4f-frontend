import { Outlet } from 'react-router-dom';
import { Navigation } from '../common/Navigation';

export function AppLayout() {
  return (
    <>
      <Navigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}
