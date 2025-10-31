import React, { useState } from 'react';
import ApiGatewayClient from '../../../services/api/ApiGatewayClient';

const ConcieraAgent: React.FC = () => {
  const [inputText, setInputText] = useState('Get a talking point and upsell suggestion!');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputText.trim()) {
      return;
    }

    try {
      setIsLoading(true);
      setResponse(''); // Clear previous response

      const apiClient = ApiGatewayClient.getInstance();
      const result = await apiClient.postConcieraAi(inputText);

      // Extract the string from the body
      const responseBody = result.body;
      setResponse(responseBody);

      // Clear input after successful submission
      setInputText('');
    } catch (error) {
      console.error('Error submitting to Conciera:', error);
      setResponse('Error: Failed to get response from Conciera. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-300 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Textarea */}
        <div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Get a talking point and upsell suggestion!"
            rows={4}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            disabled={isLoading}
          />
        </div>

        {/* Response Display */}
        {(response) && <div className="mt-4 p-4 bg-gray-50 border border-gray-200 rounded-md">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Conciera Response:</h3>
              <p className="text-sm text-gray-800 whitespace-pre-wrap">{response}</p>
            </div>}
      
        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Asking...' : 'Ask Conciera'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConcieraAgent;
