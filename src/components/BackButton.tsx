import React from 'react';
import { ArrowLeft } from 'lucide-react';

type BackButtonProps = {
  onClick?: () => void;
};

const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <button 
      onClick={onClick} 
      className="text-leboncoin hover:text-leboncoin-hover transition-colors p-2"
      aria-label="Retour"
    >
      <ArrowLeft size={24} />
    </button>
  );
};

export default BackButton;