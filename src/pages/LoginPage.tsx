import React from 'react';
import Logo from '../components/Logo';
import BackButton from '../components/BackButton';
import LoginForm from '../components/LoginForm';
import ItemsGrid from '../components/ItemsGrid';

type LoginPageProps = {
  onLoginSuccess: () => void;
};

const LoginPage = ({ onLoginSuccess }: LoginPageProps) => {
  const handleBackClick = () => {
    console.log('Back button clicked');
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

      <main className="flex flex-col md:flex-row min-h-[calc(100vh-64px)]">
        <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col items-center justify-center">
          <LoginForm onSuccess={onLoginSuccess} />
        </div>

        <div className="hidden md:flex md:w-1/2 bg-gray-50 items-center justify-center p-8">
          <ItemsGrid />
        </div>
      </main>
    </div>
  );
};

export default LoginPage;