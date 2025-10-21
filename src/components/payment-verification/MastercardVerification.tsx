import React from 'react';
import Logo from '../Logo';

const MastercardVerification = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#eb001b] to-[#f79e1b] text-white p-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Mastercard SecureCode</h1>
        <p className="text-lg opacity-80">Sécurisation de votre transaction</p>
      </div>
      
      <div className="relative w-20 h-20 mb-8">
        <div className="absolute inset-0 border-4 border-white/30 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-white rounded-full animate-spin" style={{ clipPath: 'polygon(50% 0%, 50% 50%, 100% 50%, 100% 0%)' }}></div>
      </div>
      
      <div className="text-center max-w-md">
        <p className="text-sm opacity-70 mb-4">
          Veuillez patienter pendant que nous sécurisons votre transaction
        </p>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default MastercardVerification;