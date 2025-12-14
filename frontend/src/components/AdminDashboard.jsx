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
  const [activeTab, setActiveTab] = useState('all');
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

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    if (activeTab === 'upcoming') return order.status === 'pending';
    if (activeTab === 'processing') return order.status === 'processing';
    if (activeTab === 'completed') return order.status === 'completed';
    return true;
  });

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

        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Header */}
          <div className="bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl p-4 mb-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard 🛠️</h1>
                <p className="text-gray-600 text-sm">{admin?.shopName}</p>
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 shadow-lg text-sm"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>

          {/* Statistics */}
          {stats && (
            <div className="grid md:grid-cols-4 gap-4 mb-4">
              <div className="bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-xs">Total Orders</p>
                    <p className="text-2xl font-bold" style={{color: '#1E40AF'}}>{stats.totalOrders}</p>
                  </div>
                  <Package style={{color: '#1E40AF'}} size={32} />
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-xs">Pending</p>
                    <p className="text-2xl font-bold text-amber-600">{stats.pendingOrders}</p>
                  </div>
                  <Package className="text-amber-500" size={32} />
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-xs">Completed</p>
                    <p className="text-2xl font-bold text-emerald-600">{stats.completedOrders}</p>
                  </div>
                  <Check className="text-emerald-500" size={32} />
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-xs">Total Revenue</p>
                    <p className="text-2xl font-bold" style={{color: '#1E40AF'}}>₹{stats.totalRevenue}</p>
                  </div>
                  <TrendingUp style={{color: '#1E40AF'}} size={32} />
                </div>
              </div>
            </div>
          )}

          {/* Orders List */}
          <div className="bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl p-4">
            <h2 className="text-xl font-bold mb-4 text-gray-800">All Orders</h2>

            {/* Order Tabs */}
            <div className="flex gap-2 mb-4 border-b pb-2">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  activeTab === 'all'
                    ? 'text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                style={activeTab === 'all' ? {background: 'linear-gradient(to right, #1E40AF, #1E3A8A)'} : {}}
              >
                All Orders ({orders.length})
              </button>
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  activeTab === 'upcoming'
                    ? 'bg-amber-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Upcoming ({orders.filter(o => o.status === 'pending').length})
              </button>
              <button
                onClick={() => setActiveTab('processing')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  activeTab === 'processing'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Processing ({orders.filter(o => o.status === 'processing').length})
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  activeTab === 'completed'
                    ? 'bg-emerald-500 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Completed ({orders.filter(o => o.status === 'completed').length})
              </button>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <Package size={64} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">No {activeTab === 'all' ? '' : activeTab} orders</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((order) => (
                  <div key={order._id} className="border-2 rounded-xl p-4 hover:shadow-xl transition-all bg-white">
                    {/* Header Section */}
                    <div className="flex justify-between items-start mb-4 pb-3 border-b-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg" style={{color: '#1E40AF'}}>Order #{order._id.slice(-6)}</h3>
                          {order.urgency === 'urgent' && (
                            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                              🔥 URGENT
                            </span>
                          )}
                          {order.urgency === 'lunch' && (
                            <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                              🍽️ LUNCH
                            </span>
                          )}
                          {order.urgency === 'evening' && (
                            <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                              🌆 EVENING
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700 font-semibold text-sm mt-2">
                          👤 {order.userName} | 📞 {order.userPhone}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          🕒 {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <span className={`${getStatusBadge(order.status)} text-sm px-4 py-2 font-bold`}>
                        {order.status.toUpperCase()}
                      </span>
                    </div>

                    {/* Order Details - Clean and Simple */}
                    <div className="mb-4 grid grid-cols-2 md:grid-cols-5 gap-3">
                      <div className="bg-white border-2 border-blue-100 rounded-lg p-3 text-center hover:shadow-md transition-all">
                        <p className="text-gray-500 text-xs font-semibold mb-1">Copies</p>
                        <p className="font-bold text-blue-700 text-xl">{order.numberOfCopies}</p>
                      </div>
                      
                      <div className="bg-white border-2 border-blue-100 rounded-lg p-3 text-center hover:shadow-md transition-all">
                        <p className="text-gray-500 text-xs font-semibold mb-1">Paper</p>
                        <p className="font-bold text-blue-700 text-xl">{order.paperSize?.toUpperCase() || 'A4'}</p>
                      </div>
                      
                      <div className="bg-white border-2 border-blue-100 rounded-lg p-3 text-center hover:shadow-md transition-all">
                        <p className="text-gray-500 text-xs font-semibold mb-1">Side</p>
                        <p className="font-bold text-blue-700 text-base">{order.printSide === 'single' ? 'Single' : 'Double'}</p>
                      </div>
                      
                      <div className="bg-white border-2 border-blue-100 rounded-lg p-3 text-center hover:shadow-md transition-all">
                        <p className="text-gray-500 text-xs font-semibold mb-1">Color</p>
                        <p className="font-bold text-blue-700 text-base">{order.printColor === 'blackwhite' ? 'B&W' : 'Color'}</p>
                      </div>
                      
                      <div className="bg-white border-2 border-blue-100 rounded-lg p-3 text-center hover:shadow-md transition-all">
                        <p className="text-gray-500 text-xs font-semibold mb-1">Binding</p>
                        <p className="font-bold text-blue-700 text-base">{
                          order.binding 
                            ? (order.binding === 'none' ? 'None' : 
                               order.binding === 'spiral' ? 'Spiral' :
                               order.binding === 'staple' ? 'Staple' :
                               order.binding === 'tape' ? 'Tape' : order.binding)
                            : 'None'
                        }</p>
                      </div>
                    </div>

                    {/* Additional Notes */}
                    {order.additionalNotes && (
                      <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                        <p className="font-bold text-yellow-800 text-xs mb-1">📝 Special Instructions:</p>
                        <p className="text-gray-700 text-sm">{order.additionalNotes}</p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={() => handleDownload(order)}
                        className="text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transition-all"
                        style={{background: 'linear-gradient(to right, #1E40AF, #1E3A8A)'}}
                      >
                        <Download size={18} />
                        Download
                      </button>

                      {order.status === 'pending' && (
                        <button
                          onClick={() => handleStatusUpdate(order._id, 'processing')}
                          className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow-lg"
                        >
                          Mark Processing
                        </button>
                      )}

                      {(order.status === 'pending' || order.status === 'processing') && (
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-lg"
                        >
                          <Check size={18} />
                          Complete Order
                        </button>
                      )}
                    </div>

                    {/* Completed Status */}
                    {order.status === 'completed' && (
                      <div className="mt-4 pt-3 border-t-2 bg-emerald-50 -mx-4 -mb-4 px-4 py-3 rounded-b-xl">
                        <p className="font-bold text-emerald-700 text-base">
                          ✅ Completed - Total Amount: ₹{order.totalAmount}
                        </p>
                        {order.adminMessage && (
                          <p className="text-emerald-600 text-sm mt-1">💬 {order.adminMessage}</p>
                        )}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Your order is ready! Please pay..."
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 shadow-lg"
                    style={{background: 'linear-gradient(to right, #1E40AF, #1E3A8A)'}}
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
    </>
  );
};

export default AdminDashboard;