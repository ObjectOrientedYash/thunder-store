import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';

const NavBar = () => {
  return (
    <div>
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-xl font-bold">
            Thunder Store
          </Link>
          <div className="flex flex-row items-center">
            <Link to="/cart" className="text-white flex items-center">
              <FiShoppingCart className="text-2xl mr-1" />
              Cart
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
