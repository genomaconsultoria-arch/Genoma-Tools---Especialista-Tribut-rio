
import React, { useEffect, useMemo } from 'react';

interface ResponseDisplayProps {
  isLoading: boolean;
  error: string | null;
  response: string;
}

const LoadingSkeleton: React.FC = () => (
  <div className="space-y-4 animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded w-full"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    <div className="h-4 bg-gray-200 rounded w-full"></div>
    <div className="h-6 bg-gray-200 rounded w-1/2 mt-6"></div>
    <div className="h-4 bg-gray-200 rounded w-full"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
  </div>
);


const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ isLoading, error, response }) => {
  const parsedHtml = useMemo(() => {
    if (!response) return '';
    if (typeof (window as any).marked === 'function') {
      return (window as any).marked.parse(response);
    }
    return response.replace(/\n/g, '<br />');
  }, [response]);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSkeleton />;
    }

    if (error) {
      return (
        <div className="text-center text-red-600 bg-red-50 p-4 rounded-lg">
          <h3 className="font-bold">Erro</h3>
          <p>{error}</p>
        </div>
      );
    }
    
    if (response) {
      return (
         <div
          className="prose max-w-none text-gray-700 prose-headings:text-[#003366] prose-strong:text-gray-800 prose-a:text-[#00a99d] prose-ul:list-disc prose-ul:ml-6 prose-ol:list-decimal prose-ol:ml-6"
          dangerouslySetInnerHTML={{ __html: parsedHtml }}
        />
      );
    }

    return (
      <div className="text-center text-gray-500 py-8">
        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">Aguardando sua pergunta</h3>
        <p className="mt-1 text-sm text-gray-500">
          As dicas e estratégias aparecerão aqui.
        </p>
      </div>
    );
  };
  
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-200 min-h-[200px] w-full">
      {renderContent()}
    </div>
  );
};

export default ResponseDisplay;
   