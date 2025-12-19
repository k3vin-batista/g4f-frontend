import { NavLink } from 'react-router-dom';
import './Navigation.css';

export function Navigation() {
  return (
    <nav className="nav">
      <div className="navContainer">
        <span className="navBrand">Prova Frontend</span>

        <div className="navLinks">
          <NavLink
            to="/cep"
            className={({ isActive }) => (isActive ? 'navLink active' : 'navLink')}
          >
            CEP
          </NavLink>

          <NavLink
            to="/noticias"
            className={({ isActive }) => (isActive ? 'navLink active' : 'navLink')}
          >
            Notícias
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
