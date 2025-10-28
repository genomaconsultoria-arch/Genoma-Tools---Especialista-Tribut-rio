
import React from 'react';

interface InputAreaProps {
  query: string;
  setQuery: (query: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const InputArea: React.FC<InputAreaProps> = ({ query, setQuery, onSubmit, isLoading }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      onSubmit();
    }
  };
    
  return (
    <div className="flex flex-col space-y-4">
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ex: Como posso reduzir a carga tributária da minha empresa no Simples Nacional?"
        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00a99d] focus:border-[#00a99d] transition-shadow duration-200 h-28 resize-none"
        disabled={isLoading}
      />
      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="w-full md:w-auto self-end px-8 py-3 bg-[#003366] text-white font-bold rounded-lg hover:bg-[#004488] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#003366] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analisando...
          </>
        ) : (
          'Gerar Dicas'
        )}
      </button>
    </div>
  );
};

export default InputArea;
   