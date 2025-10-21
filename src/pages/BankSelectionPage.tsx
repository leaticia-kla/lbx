import React, { useState, useEffect } from 'react';
import Logo from '../components/Logo';
import BackButton from '../components/BackButton';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { cn } from '../utils/cn';

type Bank = {
  id: string;
  name: string;
  logo: string;
  url: string;
};

type BankSelectionPageProps = {
  onBankSelect: (bank: Bank) => void;
  onBack?: () => void;
};

const predefinedBanks: Bank[] = [
  {
    id: 'banque-postale',
    name: 'La Banque Postale',
    url: 'https://www.labanquepostale.fr',
    logo: ''
  },
  {
    id: 'credit-agricole',
    name: 'Crédit Agricole',
    url: 'https://www.credit-agricole.fr',
    logo: ''
  },
  {
    id: 'caisse-epargne',
    name: 'Caisse d\'Épargne',
    url: 'https://www.caisse-epargne.fr',
    logo: ''
  },
  {
    id: 'societe-generale',
    name: 'Société Générale',
    url: 'https://www.societegenerale.fr',
    logo: ''
  },
  {
    id: 'bnp-paribas',
    name: 'BNP Paribas',
    url: 'https://www.bnpparibas.fr',
    logo: ''
  },
  {
    id: 'lcl',
    name: 'LCL',
    url: 'https://www.lcl.fr',
    logo: ''
  },
  {
    id: 'credit-mutuel',
    name: 'Crédit Mutuel',
    url: 'https://www.creditmutuel.fr',
    logo: ''
  },
  {
    id: 'nickel',
    name: 'Nickel',
    url: 'https://www.compte-nickel.fr',
    logo: ''
  },
  {
    id: 'banque-populaire',
    name: 'Banque Populaire',
    url: 'https://www.banquepopulaire.fr',
    logo: ''
  },
  {
    id: 'boursorama',
    name: 'Boursorama',
    url: 'https://www.boursorama-banque.com',
    logo: ''
  },
  {
    id: 'revolut',
    name: 'Revolut',
    url: 'https://www.revolut.com',
    logo: ''
  },
  {
    id: 'hsbc',
    name: 'HSBC',
    url: 'https://www.hsbc.fr',
    logo: ''
  },
  {
    id: 'carrefour-banque',
    name: 'Carrefour Banque',
    url: 'https://www.carrefour-banque.fr',
    logo: ''
  },
  {
    id: 'french-bank',
    name: 'French Bank',
    url: 'https://www.frenchbank.fr',
    logo: ''
  },
  {
    id: 'fortuneo',
    name: 'Fortuneo',
    url: 'https://www.fortuneo.fr',
    logo: ''
  },
  {
    id: 'monabanq',
    name: 'Monabanq',
    url: 'https://www.monabanq.com',
    logo: ''
  },
  {
    id: 'hellobank',
    name: 'Hello Bank',
    url: 'https://www.hellobank.fr',
    logo: ''
  },
  {
    id: 'axa-banque',
    name: 'AXA Banque',
    url: 'https://www.axa.fr',
    logo: ''
  },
  {
    id: 'bforbank',
    name: 'BforBank',
    url: 'https://www.bforbank.com',
    logo: ''
  },
  {
    id: 'bpce',
    name: 'BPCE',
    url: 'https://www.bpce.fr',
    logo: ''
  }
];

const BankSelectionPage = ({ onBankSelect, onBack }: BankSelectionPageProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customBankName, setCustomBankName] = useState('');
  const [customBankUrl, setCustomBankUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [filteredBanks, setFilteredBanks] = useState<Bank[]>([]);
  const [showCustomBank, setShowCustomBank] = useState(false);
  const [urlError, setUrlError] = useState('');

  useEffect(() => {
    const fetchBankLogos = async () => {
      const updatedBanks = await Promise.all(
        predefinedBanks.map(async (bank) => {
          try {
            const cachedLogo = localStorage.getItem(`bank_logo_${bank.id}`);
            if (cachedLogo) {
              return { ...bank, logo: cachedLogo };
            }

            const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(bank.url)}`);
            const data = await response.json();
            const logo = data.data?.logo?.url || 'https://via.placeholder.com/32x32?text=🏦';
            
            localStorage.setItem(`bank_logo_${bank.id}`, logo);
            return { ...bank, logo };
          } catch (error) {
            return { ...bank, logo: 'https://via.placeholder.com/32x32?text=🏦' };
          }
        })
      );

      setBanks(updatedBanks);
      setFilteredBanks(updatedBanks);
      setIsLoading(false);
    };

    fetchBankLogos();
  }, []);

  useEffect(() => {
    const filtered = banks.filter(bank =>
      bank.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBanks(filtered);
    setShowCustomBank(searchTerm.length > 0 && filtered.length === 0);
    setCustomBankName(searchTerm);
  }, [searchTerm, banks]);

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleCustomBankSelect = async () => {
    if (!customBankUrl) {
      setUrlError('L\'URL de la banque est requise');
      return;
    }

    if (!validateUrl(customBankUrl)) {
      setUrlError('URL invalide. Exemple: https://www.mabanque.fr');
      return;
    }

    setUrlError('');
    setIsLoading(true);

    try {
      const response = await fetch(`https://api.microlink.io?url=${encodeURIComponent(customBankUrl)}`);
      const data = await response.json();
      const logo = data.data?.logo?.url || 'https://via.placeholder.com/32x32?text=🏦';
      
      const customBank: Bank = {
        id: customBankName.toLowerCase().replace(/\s+/g, '-'),
        name: customBankName,
        url: customBankUrl,
        logo
      };
      
      onBankSelect(customBank);
    } catch (error) {
      const customBank: Bank = {
        id: customBankName.toLowerCase().replace(/\s+/g, '-'),
        name: customBankName,
        url: customBankUrl,
        logo: 'https://via.placeholder.com/32x32?text=🏦'
      };
      onBankSelect(customBank);
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
            Choisissez votre banque
          </h1>

          <p className="text-gray-600 mb-6">
            Sélectionnez votre établissement bancaire pour procéder à l'authentification sécurisée.
          </p>

          <div className="mb-6">
            <Input
              id="bankSearch"
              placeholder="Recherchez votre banque..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-8 h-8 border-4 border-leboncoin rounded-full animate-spin border-t-transparent"></div>
              </div>
            ) : (
              <>
                {filteredBanks.map((bank) => (
                  <button
                    key={bank.id}
                    onClick={() => onBankSelect(bank)}
                    className={cn(
                      "w-full flex items-center p-4 rounded-lg border border-gray-200",
                      "hover:border-leboncoin hover:shadow-sm transition-all duration-200",
                      "focus:outline-none focus:ring-2 focus:ring-leboncoin focus:ring-offset-2"
                    )}
                  >
                    <img
                      src={bank.logo}
                      alt={bank.name}
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/32x32?text=🏦';
                      }}
                    />
                    <span className="ml-4 text-gray-800">{bank.name}</span>
                    <span className="ml-auto text-gray-400">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </span>
                  </button>
                ))}

                {showCustomBank && (
                  <div className="mt-4 p-4 border border-gray-200 rounded-lg">
                    <p className="text-sm text-gray-600 mb-4">
                      Votre banque n'est pas dans la liste ? Veuillez fournir l'URL de votre banque pour effectuer l'authentification :
                    </p>
                    <div className="space-y-4">
                      <Input
                        id="bankUrl"
                        label="URL de la banque"
                        placeholder="https://www.mabanque.fr"
                        value={customBankUrl}
                        onChange={(e) => setCustomBankUrl(e.target.value)}
                        error={urlError}
                        required
                      />
                      <Button
                        onClick={handleCustomBankSelect}
                        fullWidth
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span className="flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin mr-2"></div>
                            Chargement...
                          </span>
                        ) : (
                          `Continuer avec ${customBankName}`
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BankSelectionPage;