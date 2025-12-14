import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogOut, Upload, FileText, Clock, CheckCircle, XCircle } from 'lucide-react';

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('new-order');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    document: null,
    numberOfCopies: 1,
    printSide: 'single',
    printColor: 'blackwhite',
    paperSize: 'a4',
    binding: 'none',
    urgency: 'normal',
    additionalNotes: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (activeTab === 'my-orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/orders/my-orders');
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, document: e.target.files[0] });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    const data = new FormData();
    data.append('document', formData.document);
    data.append('numberOfCopies', formData.numberOfCopies);
    data.append('printSide', formData.printSide);
    data.append('printColor', formData.printColor);
    data.append('paperSize', formData.paperSize);
    data.append('binding', formData.binding);
    data.append('urgency', formData.urgency);
    data.append('additionalNotes', formData.additionalNotes);

    try {
      await axios.post('/api/orders', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setMessage({ type: 'success', text: 'Order placed successfully!' });
      setFormData({
        document: null,
        numberOfCopies: 1,
        printSide: 'single',
        printColor: 'blackwhite',
        paperSize: 'a4',
        binding: 'none',
        urgency: 'normal',
        additionalNotes: ''
      });
      document.getElementById('fileInput').value = '';
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to place order' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'badge badge-pending',
      processing: 'badge badge-processing',
      completed: 'badge badge-completed',
      cancelled: 'badge badge-cancelled'
    };
    return badges[status] || 'badge';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} />;
      case 'processing':
        return <Clock size={16} />;
      case 'completed':
        return <CheckCircle size={16} />;
      case 'cancelled':
        return <XCircle size={16} />;
      default:
        return null;
    }
  };

  const formatPrintSide = (side) => {
    return side === 'single' ? 'Single Side' : 'Double Side';
  };

  const formatPrintColor = (color) => {
    return color === 'blackwhite' ? 'Black & White' : 'Color';
  };

  const formatBinding = (binding) => {
    if (!binding) return 'No Binding';
    const bindings = {
      none: 'No Binding',
      spiral: 'Spiral Binding',
      staple: 'Staple Binding',
      tape: 'Tape Binding'
    };
    return bindings[binding] || binding;
  };

  const formatUrgency = (urgency) => {
    if (!urgency) return '📅 Normal';
    const urgencies = {
      urgent: '🔥 Urgent (ASAP)',
      lunch: '🍽️ Lunch Break',
      evening: '🌆 Evening',
      normal: '📅 Normal (Next Day)'
    };
    return urgencies[urgency] || urgency;
  };

  return (
    <>
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      <div className="min-h-screen relative overflow-hidden py-8 px-4" style={{background: 'linear-gradient(to bottom right, #1E40AF, #1E3A8A, #1E40AF)'}}>
        {/* Background Image */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full" 
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?w=1920&h=1080&fit=crop)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        </div>
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto max-w-5xl relative z-10">
          {/* Header */}
          <div className="bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl p-6 mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.name}! 👋</h1>
                <p className="text-gray-600">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 shadow-lg"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl mb-6">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('new-order')}
                className={`flex-1 py-4 px-6 font-semibold transition-all ${
                  activeTab === 'new-order'
                    ? 'text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                } rounded-tl-xl`}
                style={activeTab === 'new-order' ? {background: 'linear-gradient(to right, #1E40AF, #1E3A8A)'} : {}}
              >
                <Upload className="inline mr-2" size={20} />
                New Order
              </button>
              <button
                onClick={() => setActiveTab('my-orders')}
                className={`flex-1 py-4 px-6 font-semibold transition-all ${
                  activeTab === 'my-orders'
                    ? 'text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                } rounded-tr-xl`}
                style={activeTab === 'my-orders' ? {background: 'linear-gradient(to right, #1E40AF, #1E3A8A)'} : {}}
              >
                <FileText className="inline mr-2" size={20} />
                My Orders
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'new-order' ? (
                <div>
                  <h2 className="text-xl font-bold mb-4 text-gray-800">Place New Xerox Order</h2>

                  {message.text && (
                    <div
                      className={`mb-4 px-4 py-2 rounded-lg text-sm ${
                        message.type === 'success'
                          ? 'bg-green-50 border border-green-200 text-green-700'
                          : 'bg-red-50 border border-red-200 text-red-700'
                      }`}
                    >
                      {message.text}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-semibold mb-2 text-sm">
                        Upload Document (PDF or Image)
                      </label>
                      <input
                        id="fileInput"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2 text-sm">
                          Number of Copies
                        </label>
                        <input
                          type="number"
                          name="numberOfCopies"
                          value={formData.numberOfCopies}
                          onChange={handleChange}
                          min="1"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2 text-sm">
                          Paper Size
                        </label>
                        <select
                          name="paperSize"
                          value={formData.paperSize}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          required
                        >
                          <option value="a4">A4</option>
                          <option value="a3">A3</option>
                          <option value="letter">Letter</option>
                          <option value="legal">Legal</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2 text-sm">
                          Print Side
                        </label>
                        <select
                          name="printSide"
                          value={formData.printSide}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          required
                        >
                          <option value="single">Single Side</option>
                          <option value="double">Double Side</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2 text-sm">
                          Print Color
                        </label>
                        <select
                          name="printColor"
                          value={formData.printColor}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          required
                        >
                          <option value="blackwhite">Black & White</option>
                          <option value="color">Color</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2 text-sm">
                          Binding Type
                        </label>
                        <select
                          name="binding"
                          value={formData.binding}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          required
                        >
                          <option value="none">No Binding</option>
                          <option value="spiral">Spiral Binding</option>
                          <option value="staple">Staple Binding</option>
                          <option value="tape">Tape Binding</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2 text-sm">
                          When do you need it?
                        </label>
                        <select
                          name="urgency"
                          value={formData.urgency}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          required
                        >
                          <option value="urgent">🔥 Urgent (ASAP)</option>
                          <option value="lunch">🍽️ Lunch Break</option>
                          <option value="evening">🌆 Evening</option>
                          <option value="normal">📅 Normal (Next Day)</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 font-semibold mb-2 text-sm">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        rows="2"
                        placeholder="Any special instructions..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full text-white px-6 py-2.5 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl text-sm"
                      style={{background: 'linear-gradient(to right, #1E40AF, #1E3A8A)'}}
                    >
                      {loading ? 'Placing Order...' : 'Place Order'}
                    </button>
                  </form>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-bold mb-4 text-gray-800">My Orders</h2>
                  
                  {orders.length === 0 ? (
                    <div className="text-center py-12">
                      <FileText size={64} className="mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500 text-lg">No orders yet</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orders.map((order) => (
                        <div key={order._id} className="border rounded-lg p-3 hover:shadow-md transition-all bg-white">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-bold text-base">Order #{order._id.slice(-6)}</h3>
                              <p className="text-gray-600 text-xs">
                                {new Date(order.createdAt).toLocaleString()}
                              </p>
                            </div>
                            <span className={`${getStatusBadge(order.status)} flex items-center gap-1 text-xs px-2 py-1`}>
                              {getStatusIcon(order.status)}
                              {order.status.toUpperCase()}
                            </span>
                          </div>

                          <div className="grid md:grid-cols-3 gap-2 text-xs mb-1">
                            <div>
                              <span className="font-semibold">Copies:</span> {order.numberOfCopies}
                            </div>
                            <div>
                              <span className="font-semibold">Paper Size:</span> {order.paperSize?.toUpperCase() || 'A4'}
                            </div>
                            <div>
                              <span className="font-semibold">Print Side:</span> {formatPrintSide(order.printSide)}
                            </div>
                          </div>

                          <div className="grid md:grid-cols-3 gap-2 text-xs mb-1">
                            <div>
                              <span className="font-semibold">Color:</span> {formatPrintColor(order.printColor)}
                            </div>
                            <div>
                              <span className="font-semibold">Binding:</span> {order.binding ? formatBinding(order.binding) : 'No Binding'}
                            </div>
                            <div>
                              <span className="font-semibold">Urgency:</span> {order.urgency ? formatUrgency(order.urgency) : '📅 Normal (Next Day)'}
                            </div>
                          </div>

                          {order.additionalNotes && (
                            <div className="mt-1 p-2 bg-gray-50 rounded text-xs">
                              <span className="font-semibold">Notes:</span> {order.additionalNotes}
                            </div>
                          )}

                          {order.status === 'completed' && (
                            <div className="mt-2 pt-2 border-t">
                              <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                                <p className="font-semibold text-green-800 mb-1 text-xs">
                                  Total Amount: ₹{order.totalAmount}
                                </p>
                                {order.adminMessage && (
                                  <p className="text-green-700 text-xs">{order.adminMessage}</p>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;