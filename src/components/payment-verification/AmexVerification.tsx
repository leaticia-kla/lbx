import React from 'react';
import Logo from '../Logo';

const AmexVerification = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#006fcf] text-white p-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">American Express SafeKey</h1>
        <p className="text-lg opacity-80">Vérification de sécurité en cours</p>
      </div>
      
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 animate-ping bg-white/20 rounded-lg"></div>
        <div className="relative flex items-center justify-center w-full h-full bg-white/10 backdrop-blur-sm rounded-lg">
          <div className="w-12 h-12 border-4 border-white rounded-full animate-spin border-t-transparent"></div>
        </div>
      </div>
      
      <div className="text-center max-w-md">
        <p className="text-sm opacity-70 mb-4">
          Authentification de votre carte American Express en cours
        </p>
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default AmexVerification;