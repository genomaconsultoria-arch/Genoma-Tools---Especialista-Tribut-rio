
import React, { useState, useCallback } from 'react';
import { getTaxTips } from './services/geminiService';
import Header from './components/Header';
import InputArea from './components/InputArea';
import ResponseDisplay from './components/ResponseDisplay';
import Footer from './components/Footer';

function App() {
  const [query, setQuery] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setResponse('');

    try {
      const tips = await getTaxTips(query);
      setResponse(tips);
    } catch (err) {
      console.error(err);
      setError('Ocorreu um erro ao buscar as dicas. Por favor, tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  }, [query, isLoading]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 mb-8">
             <h2 className="text-2xl font-bold text-gray-800 mb-2">Seu Especialista em Redução de Custos Tributários</h2>
            <p className="text-gray-600 mb-6">
              Faça sua pergunta sobre direito tributário, planejamento fiscal ou como otimizar os impostos da sua empresa. Nossa IA fornecerá insights e estratégias para ajudar você a economizar.
            </p>
            <InputArea
              query={query}
              setQuery={setQuery}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>
          <ResponseDisplay
            isLoading={isLoading}
            error={error}
            response={response}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
   