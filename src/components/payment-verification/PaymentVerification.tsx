import React, { useEffect } from 'react';

type CardType = 'visa' | 'mastercard' | 'amex';

type PaymentVerificationProps = {
  cardType: CardType;
  onComplete: () => void;
};

const PaymentVerification = ({ cardType, onComplete }: PaymentVerificationProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const getStyles = () => {
    switch (cardType) {
      case 'visa':
        return {
          background: '#1a1f71',
          title: 'Verified by Visa',
          message: 'Vérification de votre paiement en cours'
        };
      case 'mastercard':
        return {
          background: 'bg-gradient-to-br from-[#eb001b] to-[#f79e1b]',
          title: 'Mastercard SecureCode',
          message: 'Sécurisation de votre transaction'
        };
      case 'amex':
        return {
          background: '#006fcf',
          title: 'American Express SafeKey',
          message: 'Vérification de sécurité en cours'
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center text-white p-4 ${
      styles.background.includes('gradient') ? styles.background : `bg-[${styles.background}]`
    }`}>
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">{styles.title}</h1>
        <p className="text-lg opacity-80">{styles.message}</p>
      </div>
      
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 animate-ping bg-white/20 rounded-lg"></div>
        <div className="relative flex items-center justify-center w-full h-full bg-white/10 backdrop-blur-sm rounded-lg">
          <div className="w-12 h-12 border-4 border-white rounded-full animate-spin border-t-transparent"></div>
        </div>
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

export default PaymentVerification;