import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogOut, Download, Check, Package, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [completionData, setCompletionData] = useState({
    totalAmount: '',
    adminMessage: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
    fetchStats();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('/api/admin/orders');
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get('/api/admin/stats');
      setStats(response.data.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await axios.put(`/api/admin/orders/${orderId}/status`, { status: newStatus });
      fetchOrders();
      fetchStats();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update order status');
    }
  };

  const handleCompleteOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put(`/api/admin/orders/${selectedOrder._id}/complete`, completionData);
      setSelectedOrder(null);
      setCompletionData({ totalAmount: '', adminMessage: '' });
      fetchOrders();
      fetchStats();
      alert('Order completed and notification sent to user!');
    } catch (error) {
      console.error('Error completing order:', error);
      alert('Failed to complete order');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (order) => {
    window.open(`http://localhost:5000/${order.document.path}`, '_blank');
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard 🛠️</h1>
              <p className="text-gray-600">{admin?.shopName}</p>
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

        {/* Statistics */}
        {stats && (
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Orders</p>
                  <p className="text-3xl font-bold text-cyan-600">{stats.totalOrders}</p>
                </div>
                <Package className="text-cyan-500" size={40} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Pending</p>
                  <p className="text-3xl font-bold text-amber-600">{stats.pendingOrders}</p>
                </div>
                <Package className="text-amber-500" size={40} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Completed</p>
                  <p className="text-3xl font-bold text-emerald-600">{stats.completedOrders}</p>
                </div>
                <Check className="text-emerald-500" size={40} />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Total Revenue</p>
                  <p className="text-3xl font-bold text-blue-600">₹{stats.totalRevenue}</p>
                </div>
                <TrendingUp className="text-blue-500" size={40} />
              </div>
            </div>
          </div>
        )}

        {/* Orders List */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">All Orders</h2>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <Package size={64} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No orders yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="border rounded-lg p-4 hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">Order #{order._id.slice(-6)}</h3>
                      <p className="text-gray-600">
                        {order.userName} - {order.userPhone}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {new Date(order.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <span className={getStatusBadge(order.status)}>
                      {order.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-4 gap-4 mb-4 text-sm">
                    <div>
                      <span className="font-semibold">Copies:</span> {order.numberOfCopies}
                    </div>
                    <div>
                      <span className="font-semibold">Side:</span> {order.printSide}
                    </div>
                    <div>
                      <span className="font-semibold">Color:</span> {order.printColor}
                    </div>
                    <div>
                      <span className="font-semibold">File:</span> {order.document.filename}
                    </div>
                  </div>

                  {order.additionalNotes && (
                    <div className="mb-4 p-3 bg-gray-50 rounded">
                      <p className="text-sm"><strong>Notes:</strong> {order.additionalNotes}</p>
                    </div>
                  )}

                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => handleDownload(order)}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
                    >
                      <Download size={16} />
                      Download
                    </button>

                    {order.status === 'pending' && (
                      <button
                        onClick={() => handleStatusUpdate(order._id, 'processing')}
                        className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                      >
                        Mark Processing
                      </button>
                    )}

                    {(order.status === 'pending' || order.status === 'processing') && (
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2"
                      >
                        <Check size={16} />
                        Complete Order
                      </button>
                    )}
                  </div>

                  {order.status === 'completed' && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="font-semibold text-emerald-600">
                        Completed - Amount: ₹{order.totalAmount}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Complete Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-2xl font-bold mb-4">Complete Order</h3>
            <p className="text-gray-600 mb-4">
              Order #{selectedOrder._id.slice(-6)} - {selectedOrder.userName}
            </p>

            <form onSubmit={handleCompleteOrder}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Total Amount (₹)
                </label>
                <input
                  type="number"
                  value={completionData.totalAmount}
                  onChange={(e) => setCompletionData({ ...completionData, totalAmount: e.target.value })}
                  className="input-field"
                  placeholder="Enter amount"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  Message to User (Optional)
                </label>
                <textarea
                  value={completionData.adminMessage}
                  onChange={(e) => setCompletionData({ ...completionData, adminMessage: e.target.value })}
                  className="input-field"
                  rows="3"
                  placeholder="Your order is ready! Please pay..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 btn-primary disabled:opacity-50"
                >
                  {loading ? 'Completing...' : 'Complete & Notify'}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;