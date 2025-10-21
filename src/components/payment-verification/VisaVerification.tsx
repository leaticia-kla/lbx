import React from 'react';
import Logo from '../Logo';

const VisaVerification = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1f71] text-white p-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">Verified by Visa</h1>
        <p className="text-lg opacity-80">Vérification de votre paiement en cours</p>
      </div>
      
      <div className="w-16 h-16 mb-8">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      </div>
      
      <div className="text-center max-w-md">
        <p className="text-sm opacity-70 mb-4">
          Ne fermez pas cette fenêtre pendant la vérification de votre transaction
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

export default VisaVerification;