import { Printer, Upload, Bell, CreditCard } from 'lucide-react';

const Home = () => {
  const handleLogin = () => {
    
    window.location.href = '/login';
  };

  const handleRegister = () => {
    
    window.location.href = '/register';
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
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
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
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 1s ease-out forwards;
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
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float">📄</div>
          <div className="absolute top-40 right-20 text-5xl opacity-20 animate-float-delayed">📚</div>
          <div className="absolute bottom-32 left-1/4 text-7xl opacity-20 animate-float">🖨️</div>
          <div className="absolute bottom-20 right-1/3 text-5xl opacity-20 animate-float-delayed">📑</div>
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="text-center text-white mb-12">
            <div className="relative inline-block mb-6">
              
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-400 rounded-full animate-ping"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-white to-blue-300 animate-fade-in-up">
              FX College Xerox 
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-6 animate-fade-in-up animation-delay-200">
              Fast, Reliable & Affordable Printing Service
            </p>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-1 w-16 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"></div>
              <Printer className="text-blue-300 animate-bounce-slow" size={24} />
              <div className="h-1 w-16 bg-gradient-to-r from-transparent via-blue-300 to-transparent animate-pulse"></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
              <button 
                onClick={handleLogin}
                className="group bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold text-base hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-blue-500/50 transform hover:-translate-y-1 hover:scale-105 cursor-pointer"
              >
                <span className="flex items-center justify-center gap-2">
                  Login Now
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </button>
              <button 
                onClick={handleRegister}
                className="group relative bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold text-base transition-all duration-300 shadow-xl hover:shadow-blue-500/50 transform hover:-translate-y-1 hover:scale-105 overflow-hidden cursor-pointer"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Register Free
                  <span className="group-hover:translate-x-1 transition-transform">✨</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-16 text-white text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white animate-fade-in-up">
              How It Works
            </h2>
            <div className="h-1 w-20 bg-blue-300 mx-auto rounded-full mb-10"></div>
            <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
              <div className="group bg-blue-500/25 backdrop-blur-md rounded-xl p-5 hover:bg-blue-500/35 transition-all duration-300 border border-blue-300/40 animate-fade-in-up animation-delay-200">
                <div className="bg-gradient-to-br from-blue-400 to-blue-500 text-white text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  1
                </div>
                <Upload size={32} className="mx-auto mb-2 text-blue-200" />
                <h3 className="text-base font-semibold mb-1.5 text-white">Upload Document</h3>
                <p className="text-blue-100 text-xs">Choose your file and select print options</p>
              </div>
              <div className="group bg-indigo-500/25 backdrop-blur-md rounded-xl p-5 hover:bg-indigo-500/35 transition-all duration-300 border border-indigo-300/40 animate-fade-in-up animation-delay-400">
                <div className="bg-gradient-to-br from-indigo-400 to-indigo-500 text-white text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  2
                </div>
                <Bell size={32} className="mx-auto mb-2 text-indigo-200" />
                <h3 className="text-base font-semibold mb-1.5 text-white">Wait for Notification</h3>
                <p className="text-indigo-100 text-xs">We'll notify you when it's ready</p>
              </div>
              <div className="group bg-purple-500/25 backdrop-blur-md rounded-xl p-5 hover:bg-purple-500/35 transition-all duration-300 border border-purple-300/40 animate-fade-in-up animation-delay-600">
                <div className="bg-gradient-to-br from-purple-400 to-purple-500 text-white text-2xl font-bold w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  3
                </div>
                <CreditCard size={32} className="mx-auto mb-2 text-purple-200" />
                <h3 className="text-base font-semibold mb-1.5 text-white">Collect & Pay</h3>
                <p className="text-purple-100 text-xs">Pick up and pay via Cash or UPI</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;