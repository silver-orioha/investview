import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav>
      <Link to="/" className="logo">
        InvestView
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/compare">Compare</Link>
        <Link to="/enquiry">Enquiry</Link>
      </div>
    </nav>
  );
}

export default Navbar;