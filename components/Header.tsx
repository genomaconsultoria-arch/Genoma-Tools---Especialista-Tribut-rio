
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md w-full">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img 
            src="https://www.genomaconsultoria.com.br/wp-content/uploads/2021/07/Genoma-Consultoria-logo-horizontal-branco-e-azul-300x74.png" 
            alt="Genoma Consultoria Logo" 
            className="h-12"
          />
        </div>
        <h1 className="text-xl md:text-2xl font-semibold text-[#003366]">
          Genoma Tools
        </h1>
      </div>
    </header>
  );
};

export default Header;
   