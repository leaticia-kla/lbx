import React from 'react';
import ItemCard from './ItemCard';

const ItemsGrid = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-4xl">
      <ItemCard color="#ffb3b3">
        <svg width="80" height="80" viewBox="0 0 200 100" fill="#ff6666">
          <rect x="25" y="30" width="150" height="40" rx="10" />
          <circle cx="50" cy="85" r="15" />
          <circle cx="150" cy="85" r="15" />
        </svg>
      </ItemCard>
      
      <ItemCard color="#ffffb3">
        <svg width="80" height="80" viewBox="0 0 100 100" fill="#ffcc00">
          <rect x="20" y="60" width="60" height="10" rx="2" />
          <rect x="20" y="50" width="60" height="10" rx="2" />
          <rect x="25" y="20" width="50" height="30" rx="5" />
          <path d="M30 50 L45 30 L60 50 Z" />
        </svg>
      </ItemCard>
      
      <ItemCard color="#b3e6ff">
        <svg width="80" height="80" viewBox="0 0 100 100" fill="#0099cc">
          <rect x="20" y="20" width="60" height="60" rx="5" />
          <rect x="30" y="15" width="40" height="10" rx="2" />
          <rect x="45" y="10" width="10" height="10" rx="2" />
        </svg>
      </ItemCard>
      
      <ItemCard color="#ffccb3">
        <svg width="80" height="80" viewBox="0 0 100 100" fill="#ff9966">
          <path d="M50 10 L90 50 L50 90 L10 50 Z" />
          <circle cx="50" cy="50" r="10" />
        </svg>
      </ItemCard>
      
      <ItemCard color="#d9b3ff">
        <svg width="80" height="80" viewBox="0 0 100 100" fill="#9933ff">
          <path d="M30 20 L70 20 L80 40 L80 80 L20 80 L20 40 Z" />
          <rect x="35" y="40" width="30" height="20" rx="2" />
        </svg>
      </ItemCard>
      
      <ItemCard color="#ccffcc">
        <svg width="80" height="80" viewBox="0 0 100 100" fill="#66cc66">
          <path d="M20 30 L50 10 L80 30 L80 70 L50 90 L20 70 Z" />
        </svg>
      </ItemCard>
    </div>
  );
};

export default ItemsGrid;