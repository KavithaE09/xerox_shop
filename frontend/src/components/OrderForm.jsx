import { useState } from 'react';
import axios from 'axios';
import { Upload, FileText, Copy, Palette, MessageSquare, CheckCircle } from 'lucide-react';

const OrderForm = ({ onOrderPlaced }) => {
  const [formData, setFormData] = useState({
    document: null,
    numberOfCopies: 1,
    printSide: 'single',
    printColor: 'blackwhite',
    additionalNotes: ''
  });
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, document: file });
      setFileName(file.name);
    }
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
      const response = await axios.post('/api/orders', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setMessage({ 
        type: 'success', 
        text: '🎉 Order placed successfully! You will be notified when it\'s ready.' 
      });
      
      // Reset form
      setFormData({
        document: null,
        numberOfCopies: 1,
        printSide: 'single',
        printColor: 'blackwhite',
        additionalNotes: ''
      });
      setFileName('');
      document.getElementById('fileInput').value = '';

      // Callback to parent component
      if (onOrderPlaced) {
        onOrderPlaced(response.data.order);
      }

      // Clear success message after 5 seconds
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 5000);

    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to place order. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">📄 Place New Order</h2>
        <p className="text-gray-600">Upload your document and select printing options</p>
      </div>

      {message.text && (
        <div
          className={`mb-6 px-4 py-4 rounded-lg flex items-start gap-3 animate-slide-up ${
            message.type === 'success'
              ? 'bg-green-50 border-2 border-green-200 text-green-800'
              : 'bg-red-50 border-2 border-red-200 text-red-800'
          }`}
        >
          {message.type === 'success' && <CheckCircle size={24} className="flex-shrink-0 mt-0.5" />}
          <div className="flex-1">
            <p className="font-semibold">{message.text}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-indigo-400 transition-all bg-gray-50">
          <label className="cursor-pointer block">
            <input
              id="fileInput"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
              required
            />
            <div className="text-center">
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="text-indigo-600" size={32} />
              </div>
              <p className="text-lg font-semibold text-gray-700 mb-2">
                {fileName ? fileName : 'Click to upload document'}
              </p>
              <p className="text-sm text-gray-500">
                Supported formats: PDF, JPG, PNG (Max 10MB)
              </p>
            </div>
          </label>
        </div>

        {/* Number of Copies */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl">
          <label className="flex items-center gap-2 text-gray-800 font-semibold mb-3">
            <Copy className="text-indigo-600" size={20} />
            Number of Copies
          </label>
          <input
            type="number"
            name="numberOfCopies"
            value={formData.numberOfCopies}
            onChange={handleChange}
            min="1"
            max="500"
            className="input-field text-lg font-semibold"
            required
          />
          <p className="text-sm text-gray-600 mt-2">
            Maximum 500 copies per order
          </p>
        </div>

        {/* Print Options Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Print Side */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl">
            <label className="flex items-center gap-2 text-gray-800 font-semibold mb-3">
              <FileText className="text-blue-600" size={20} />
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
              <option value="double">Double Side (Front & Back)</option>
            </select>
          </div>

          {/* Print Color */}
          <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-xl">
            <label className="flex items-center gap-2 text-gray-800 font-semibold mb-3">
              <Palette className="text-pink-600" size={20} />
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
              <option value="color">Color Print</option>
            </select>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-6 rounded-xl">
          <label className="flex items-center gap-2 text-gray-800 font-semibold mb-3">
            <MessageSquare className="text-amber-600" size={20} />
            Additional Notes (Optional)
          </label>
          <textarea
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            className="input-field"
            rows="4"
            placeholder="Any special instructions? (e.g., staple, bind, urgent, etc.)"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || !formData.document}
          className="w-full btn-primary text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
              Placing Order...
            </>
          ) : (
            <>
              <CheckCircle size={24} />
              Place Order
            </>
          )}
        </button>
      </form>

      {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>📌 Note:</strong> You will receive a notification with the total amount once your order is ready. 
          Payment can be made via Cash or UPI at the shop.
        </p>
      </div>
    </div>
  );
};

export default OrderForm;