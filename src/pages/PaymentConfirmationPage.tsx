import React from 'react';
import Logo from '../components/Logo';
import BackButton from '../components/BackButton';
import Button from '../components/ui/Button';
import { Lock } from 'lucide-react';

type PaymentConfirmationPageProps = {
  onAccept: () => void;
  onBack?: () => void;
};

const PaymentConfirmationPage = ({ onAccept, onBack }: PaymentConfirmationPageProps) => {
  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <div className="min-h-screen w-full">
      <header className="p-4 flex items-center justify-between md:justify-center relative border-b md:border-b-0">
        <div className="md:absolute md:left-4">
          <BackButton onClick={handleBackClick} />
        </div>
        <div className="md:mx-auto">
          <Logo />
        </div>
        <div className="w-6 md:hidden"></div>
      </header>

      <main className="flex justify-center items-center min-h-[calc(100vh-64px)] bg-gray-50">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-sm m-4">
          <div className="text-center mb-8">
            <div className="mx-auto mb-6">
              <img
                src="/payment-received.svg"
                alt="Payment received"
                className="w-32 h-32 mx-auto"
              />
            </div>
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              Vous avez reçu un paiement
            </h1>
            <p className="text-gray-600">
              Cliquez sur le bouton ci-dessous pour accepter le paiement. Le montant sera ensuite transféré sur votre compte bancaire.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="flex items-center text-gray-700">
              <Lock className="w-5 h-5 mr-2" />
              <p className="text-sm">
                Suite à notre nouvelle politique de sécurité, des verifications supplémentaire peuvent être nécessaire afin de lutter contre la fraude.
              </p>
            </div>
          </div>

          <Button
            type="button"
            fullWidth
            onClick={onAccept}
          >
            Accepter le paiement
          </Button>
        </div>
      </main>
    </div>
  );
};

export default PaymentConfirmationPage;