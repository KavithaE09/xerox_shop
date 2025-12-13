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

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.name}! 👋</h1>
              <p className="text-gray-600">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('new-order')}
              className={`flex-1 py-4 px-6 font-semibold transition-all ${
                activeTab === 'new-order'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              } rounded-tl-xl`}
            >
              <Upload className="inline mr-2" size={20} />
              New Order
            </button>
            <button
              onClick={() => setActiveTab('my-orders')}
              className={`flex-1 py-4 px-6 font-semibold transition-all ${
                activeTab === 'my-orders'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              } rounded-tr-xl`}
            >
              <FileText className="inline mr-2" size={20} />
              My Orders
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'new-order' ? (
              <div>
                <h2 className="text-2xl font-bold mb-6">Place New Xerox Order</h2>

                {message.text && (
                  <div
                    className={`mb-4 px-4 py-3 rounded-lg ${
                      message.type === 'success'
                        ? 'bg-green-50 border border-green-200 text-green-700'
                        : 'bg-red-50 border border-red-200 text-red-700'
                    }`}
                  >
                    {message.text}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Upload Document (PDF or Image)
                    </label>
                    <input
                      id="fileInput"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                      className="input-field"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Number of Copies
                      </label>
                      <input
                        type="number"
                        name="numberOfCopies"
                        value={formData.numberOfCopies}
                        onChange={handleChange}
                        min="1"
                        className="input-field"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Print Side
                      </label>
                      <select
                        name="printSide"
                        value={formData.printSide}
                        onChange={handleChange}
                        className="input-field"
                        required
                      >
                        <option value="single">Single Side</option>
                        <option value="double">Double Side</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Print Color
                    </label>
                    <select
                      name="printColor"
                      value={formData.printColor}
                      onChange={handleChange}
                      className="input-field"
                      required
                    >
                      <option value="blackwhite">Black & White</option>
                      <option value="color">Color</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleChange}
                      className="input-field"
                      rows="3"
                      placeholder="Any special instructions..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Placing Order...' : 'Place Order'}
                  </button>
                </form>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-6">My Orders</h2>
                
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText size={64} className="mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-500 text-lg">No orders yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order._id} className="border rounded-lg p-4 hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-bold text-lg">Order #{order._id.slice(-6)}</h3>
                            <p className="text-gray-600 text-sm">
                              {new Date(order.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <span className={`${getStatusBadge(order.status)} flex items-center gap-1`}>
                            {getStatusIcon(order.status)}
                            {order.status.toUpperCase()}
                          </span>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="font-semibold">Copies:</span> {order.numberOfCopies}
                          </div>
                          <div>
                            <span className="font-semibold">Print Side:</span> {order.printSide}
                          </div>
                          <div>
                            <span className="font-semibold">Color:</span> {order.printColor}
                          </div>
                        </div>

                        {order.status === 'completed' && (
                          <div className="mt-4 pt-4 border-t">
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                              <p className="font-semibold text-green-800 mb-2">
                                Total Amount: ₹{order.totalAmount}
                              </p>
                              {order.adminMessage && (
                                <p className="text-green-700">{order.adminMessage}</p>
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
  );
};

export default UserDashboard;