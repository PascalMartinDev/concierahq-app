import React, { useState } from 'react';

const ConcieraAgent: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputText.trim()) {
      return;
    }

    try {
      setIsLoading(true);
      // TODO: Add API call here
      console.log('Submitted text:', inputText);

      // Clear input after submission
      setInputText('');
    } catch (error) {
      console.error('Error submitting to Conciera:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-300 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Textbox */}
        <div>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Get a talking point and upsell suggestion!"
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            disabled={isLoading}
          />
        </div>

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
