import React, { useState } from 'react';
import Logo from '../components/Logo';
import BackButton from '../components/BackButton';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

type TransactionConfirmationPageProps = {
  onConfirm: (data: { amount: string; itemType: string }) => void;
  onBack?: () => void;
};

const TransactionConfirmationPage = ({ onConfirm, onBack }: TransactionConfirmationPageProps) => {
  const [formData, setFormData] = useState({
    itemType: '',
    amount: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.itemType.trim()) newErrors.itemType = 'Champ requis';
    if (!formData.amount.trim()) newErrors.amount = 'Champ requis';
    
    // Validate amount format (numbers only with optional decimals)
    if (formData.amount && !/^\d+([.,]\d{0,2})?$/.test(formData.amount)) {
      newErrors.amount = 'Format invalide. Exemple: 1234.56';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsLoading(false);
      onConfirm(formData);
    }
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

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
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Confirmation de la transaction
          </h1>

          <p className="text-gray-600 mb-6">
            Pour finaliser votre transaction en toute sécurité, veuillez confirmer les détails de votre vente. 
            Assurez-vous que les informations saisies correspondent exactement à l'article que vous vendez.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="itemType"
              label="Nature de l'article"
              placeholder="Ex: Voiture d'occasion, Smartphone, Meuble..."
              value={formData.itemType}
              onChange={handleChange}
              error={errors.itemType}
              required
            />
            
            <Input
              id="amount"
              label="Montant de l'article (€)"
              placeholder="Ex: 1234.56"
              type="text"
              value={formData.amount}
              onChange={handleChange}
              error={errors.amount}
              required
            />

            <div className="bg-gray-50 rounded-lg p-4 mt-6">
              <p className="text-sm text-gray-600">
                En confirmant cette transaction, vous certifiez que les informations fournies sont exactes 
                et que vous êtes le propriétaire légitime de l'article mis en vente.
              </p>
            </div>

            <Button 
              type="submit" 
              fullWidth 
              className="mt-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Chargement...
                </span>
              ) : (
                'Confirmer la transaction'
              )}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default TransactionConfirmationPage;