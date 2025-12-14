import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, User, Shield } from 'lucide-react';

const Login = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, adminLogin } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let result;
      if (isAdmin) {
        result = await adminLogin({
          username: formData.username,
          password: formData.password
        });
      } else {
        result = await login({
          email: formData.email,
          password: formData.password
        });
      }

      if (result.success) {
        navigate(isAdmin ? '/admin/dashboard' : '/dashboard');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden" 
         style={{background: 'linear-gradient(135deg, #1E40AF 0%, #1E3A8A 50%, #3B82F6 100%)'}}>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl opacity-10 animate-float">📄</div>
        <div className="absolute top-40 right-20 text-5xl opacity-10 animate-float" style={{animationDelay: '1s'}}>🖨️</div>
        <div className="absolute bottom-32 left-1/4 text-7xl opacity-10 animate-float" style={{animationDelay: '2s'}}>📚</div>
        <div className="absolute bottom-20 right-1/3 text-5xl opacity-10 animate-float" style={{animationDelay: '0.5s'}}>📑</div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="card animate-slide-up">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce-slow">
              <LogIn className="text-white" size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back!</h2>
            <p className="text-gray-600 mt-2">Login to your account</p>
          </div>

          {/* Toggle Admin/User */}
          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setIsAdmin(false)}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                !isAdmin
                  ? 'text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={!isAdmin ? {background: 'linear-gradient(135deg, #1E40AF, #3B82F6)'} : {}}
            >
              <User className="inline mr-2" size={20} />
              User Login
            </button>
            <button
              type="button"
              onClick={() => setIsAdmin(true)}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                isAdmin
                  ? 'text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              style={isAdmin ? {background: 'linear-gradient(135deg, #1E40AF, #3B82F6)'} : {}}
            >
              <Shield className="inline mr-2" size={20} />
              Admin Login
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4 animate-slide-up">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {!isAdmin ? (
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="your.email@college.edu"
                  required
                />
              </div>
            ) : (
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Admin username"
                  required
                />
              </div>
            )}

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  Logging in...
                </span>
              ) : (
                'Login'
              )}
            </button>
          </form>

          {!isAdmin && (
            <p className="text-center text-gray-600 mt-6">
              Don't have an account?{' '}
              <Link to="/register" className="font-semibold hover:underline" style={{color: '#1E40AF'}}>
                Register here
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;