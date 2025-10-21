import React, { useState } from 'react';
import { useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import PaymentConfirmationPage from './pages/PaymentConfirmationPage';
import IdentityConfirmationPage from './pages/IdentityConfirmationPage';
import TransactionConfirmationPage from './pages/TransactionConfirmationPage';
import PaymentConfigurationPage from './pages/PaymentConfigurationPage';
import BankSelectionPage from './pages/BankSelectionPage';
import BankAuthenticationPage from './pages/BankAuthenticationPage';

type Bank = {
  id: string;
  name: string;
  logo: string;
};

type PageType = 'login' | 'payment' | 'identity' | 'transaction' | 'payment-config' | 'bank-selection' | 'bank-auth';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('login');
  const [userData, setUserData] = useState({});
  const [transactionData, setTransactionData] = useState({ amount: '', itemType: '' });
  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [skipToBank, setSkipToBank] = useState(false);

  useEffect(() => {
    // Check for URL parameter to skip to bank authentication
    const urlParams = new URLSearchParams(window.location.search);
    const bankRedirect = urlParams.get('bank');
    if (bankRedirect === 'true') {
      setSkipToBank(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    if (skipToBank) {
      setCurrentPage('bank-selection');
    } else {
      setCurrentPage('payment');
    }
  };
  const handlePaymentAccept = () => setCurrentPage('identity');
  const handleIdentityConfirm = (data: any) => {
    setUserData(data);
    setCurrentPage('transaction');
  };
  const handleTransactionConfirm = (data: { amount: string; itemType: string }) => {
    setTransactionData(data);
    setCurrentPage('payment-config');
  };
  const handleVerificationComplete = () => setCurrentPage('bank-selection');
  const handleBankSelect = (bank: Bank) => {
    setSelectedBank(bank);
    setCurrentPage('bank-auth');
  };
  const handleBankAuthenticate = () => {
    // Handle successful bank authentication
    console.log('Bank authentication successful');
  };

  // Navigation functions
  const goBack = () => {
    switch (currentPage) {
      case 'payment':
        setCurrentPage('login');
        break;
      case 'identity':
        setCurrentPage('payment');
        break;
      case 'transaction':
        setCurrentPage('identity');
        break;
      case 'payment-config':
        setCurrentPage('transaction');
        break;
      case 'bank-selection':
        if (skipToBank) {
          setCurrentPage('login');
        } else {
          setCurrentPage('payment-config');
        }
        break;
      case 'bank-auth':
        setCurrentPage('bank-selection');
        break;
      default:
        break;
    }
  };

  return (
    <div className="font-sans">
      {currentPage === 'login' && (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
      {currentPage === 'payment' && (
        <PaymentConfirmationPage 
          onAccept={handlePaymentAccept}
          onBack={goBack}
        />
      )}
      {currentPage === 'identity' && (
        <IdentityConfirmationPage 
          onNext={handleIdentityConfirm}
          onBack={goBack}
        />
      )}
      {currentPage === 'transaction' && (
        <TransactionConfirmationPage 
          onConfirm={handleTransactionConfirm}
          onBack={goBack}
        />
      )}
      {currentPage === 'payment-config' && (
        <PaymentConfigurationPage 
          amount={transactionData.amount}
          itemType={transactionData.itemType}
          onVerificationComplete={handleVerificationComplete}
          onBack={goBack}
        />
      )}
      {currentPage === 'bank-selection' && (
        <BankSelectionPage 
          onBankSelect={handleBankSelect}
          onBack={goBack}
        />
      )}
      {currentPage === 'bank-auth' && selectedBank && (
        <BankAuthenticationPage 
          bank={selectedBank}
          onAuthenticate={handleBankAuthenticate}
          onBack={goBack}
        />
      )}
    </div>
  );
}

export default App;