import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Printer, LogOut, Home, FileText, User, Shield } from 'lucide-react';

const Navbar = () => {
  const { user, admin, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{backgroundColor: '#1E40AF'}} className="shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 ml-auto">
            {!isAuthenticated ? (
              <>
              
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 border-l border-blue-300 pl-6 ml-2">
                  <div className="flex items-center gap-2">
                    {isAdmin ? (
                      <>
                        <div className="bg-white/20 backdrop-blur-lg p-2 rounded-full">
                          <Shield className="text-white" size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{admin?.shopName}</p>
                          <p className="text-xs text-blue-200">Admin</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="bg-white/20 backdrop-blur-lg p-2 rounded-full">
                          <User className="text-white" size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{user?.name}</p>
                          <p className="text-xs text-blue-200">{user?.role}</p>
                        </div>
                      </>
                    )}
                  </div>
                  
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden ml-auto">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
              >
                <LogOut size={18} />
              </button>
            ) : (
              <div className="flex gap-2">
                <Link
                  to="/login"
                  className="bg-white text-blue-800 px-4 py-2 rounded-lg font-semibold text-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isAuthenticated && (
          <div className="md:hidden pb-4 border-t border-blue-300 pt-4">
            <div className="flex flex-col gap-3">
              <Link
                to={isAdmin ? '/admin/dashboard' : '/dashboard'}
                className="text-white hover:text-blue-200 font-semibold transition-colors flex items-center gap-2"
              >
                <FileText size={20} />
                Dashboard
              </Link>
              
              <div className="flex items-center gap-2 pt-2 border-t border-blue-300">
                {isAdmin ? (
                  <>
                    <Shield className="text-white" size={20} />
                    <div>
                      <p className="text-sm font-semibold text-white">{admin?.shopName}</p>
                      <p className="text-xs text-blue-200">Admin</p>
                    </div>
                  </>
                ) : (
                  <>
                    <User className="text-white" size={20} />
                    <div>
                      <p className="text-sm font-semibold text-white">{user?.name}</p>
                      <p className="text-xs text-blue-200">{user?.role}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Mobile Home/Login/Register Menu */}
        {!isAuthenticated && (
          <div className="md:hidden pb-4 border-t border-blue-300 pt-4">
            <Link
              to="/"
              className="text-white hover:text-blue-200 font-semibold transition-colors flex items-center gap-2 mb-3"
            >
              <Home size={20} />
              Home
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;