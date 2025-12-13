import { Link } from 'react-router-dom';
import { Printer, Upload, Bell, CreditCard } from 'lucide-react';

const Home = () => {
  return (
    <>
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-5deg); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes swing {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(15deg); }
          75% { transform: rotate(-15deg); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        
        .animate-swing {
          animation: swing 0.5s ease-in-out;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
      
      <div className="min-h-screen relative overflow-hidden" style={{background: 'linear-gradient(to bottom right, #1E40AF, #1E3A8A, #1E40AF)'}}>
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-300 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-400 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float">📄</div>
          <div className="absolute top-40 right-20 text-5xl opacity-20 animate-float-delayed">📚</div>
          <div className="absolute bottom-32 left-1/4 text-7xl opacity-20 animate-float">🖨️</div>
          <div className="absolute bottom-20 right-1/3 text-5xl opacity-20 animate-float-delayed">📑</div>
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="text-center text-white mb-16">
            <div className="relative inline-block mb-8">
              
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-400 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-6xl md:text-8xl font-extrabold mb-6 drop-shadow-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-blue-300 animate-fade-in-up">
              FX College Xerox 
            </h1>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-1 w-20 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
              
              <div className="h-1 w-20 bg-gradient-to-r from-transparent via-blue-300 to-transparent animate-pulse"></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up animation-delay-400">
              <Link to="/login" className="group bg-white text-blue-700 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-blue-50 transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 transform hover:-translate-y-2 hover:scale-105">
                <span className="flex items-center justify-center gap-2">
                  Login Now
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
              <Link to="/register" className="group relative bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 shadow-2xl hover:shadow-blue-500/50 transform hover:-translate-y-2 hover:scale-105 overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Register Free
                  <span className="group-hover:translate-x-1 transition-transform">✨</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-24 text-white text-center">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-300 animate-fade-in-up">
              How It Works
            </h2>
            <div className="h-2 w-32 bg-gradient-to-r from-blue-400 to-blue-500 mx-auto rounded-full mb-16 animate-pulse"></div>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="group bg-white/10 backdrop-blur-xl rounded-3xl p-10 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-4 hover:shadow-2xl hover:shadow-blue-500/50 border border-white/20 animate-fade-in-up animation-delay-200">
                <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 text-white text-7xl font-black w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  1
                </div>
                <Upload size={48} className="mx-auto mb-4 text-blue-300 group-hover:scale-110 transition-transform" />
                <h3 className="text-3xl font-bold mb-4 text-blue-200">Upload Document</h3>
                <p className="text-white/80 text-lg leading-relaxed">Choose your file and select print options</p>
              </div>
              <div className="group bg-white/10 backdrop-blur-xl rounded-3xl p-10 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-4 hover:shadow-2xl hover:shadow-blue-400/50 border border-white/20 animate-fade-in-up animation-delay-400">
                <div className="bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-600 text-white text-7xl font-black w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  2
                </div>
                <Bell size={48} className="mx-auto mb-4 text-blue-300 group-hover:scale-110 group-hover:animate-swing transition-transform" />
                <h3 className="text-3xl font-bold mb-4 text-blue-200">Wait for Notification</h3>
                <p className="text-white/80 text-lg leading-relaxed">We'll notify you when it's ready</p>
              </div>
              <div className="group bg-white/10 backdrop-blur-xl rounded-3xl p-10 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-4 hover:shadow-2xl hover:shadow-indigo-500/50 border border-white/20 animate-fade-in-up animation-delay-600">
                <div className="bg-gradient-to-br from-indigo-400 via-blue-500 to-indigo-600 text-white text-7xl font-black w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  3
                </div>
                <CreditCard size={48} className="mx-auto mb-4 text-indigo-300 group-hover:scale-110 transition-transform" />
                <h3 className="text-3xl font-bold mb-4 text-indigo-200">Collect & Pay</h3>
                <p className="text-white/80 text-lg leading-relaxed">Pick up and pay via Cash or UPI</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;