import React, { useState } from 'react';
import { useAppCustomer } from '../../../../workflow/hooks/useAppCustomer';
import ApiGatewayClient from '../../../../services/api/ApiGatewayClient';
import CircleButton from '../../../ui/CircleButton';
import { getGlobalAppCustomer } from '../../../../workflow/context/workflowContextInstance';

const CustomerNotes: React.FC = () => {
  const appCustomer = useAppCustomer();
  const initialNotes = appCustomer?.crm.notes || '';

  const [isEditing, setIsEditing] = useState(false);
  const [noteText, setNoteText] = useState(initialNotes);
  const [isLoading, setIsLoading] = useState(false);

  const handleCircleButtonClick = () => {
    setIsEditing(!isEditing);
    // If canceling edit, reset to original notes
    if (isEditing) {
      setNoteText(initialNotes);
    }
  };

  const handleUpdateNotes = async () => {
    try {
      setIsLoading(true);

      // Update the global app customer with the new notes
      const globalAppCustomer = getGlobalAppCustomer();
      if (globalAppCustomer && globalAppCustomer.crm) {
        globalAppCustomer.crm.notes = noteText;
      }

      // Send update to API
      const apiClient = ApiGatewayClient.getInstance();
      await apiClient.postCustomerNoteUpdate();

      // Exit editing mode
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating customer notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col p-4 min-h-[200px]">
      {/* CircleButton in top-right corner */}
      <div className="absolute top-2 right-2">
        <CircleButton onButtonClick={handleCircleButtonClick} />
      </div>

      {/* Textarea */}
      <textarea
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        placeholder="No available notes!"
        readOnly={!isEditing}
        className={`w-full h-full min-h-[150px] border border-gray-300 rounded-md p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
          !isEditing ? 'bg-gray-50 cursor-default' : 'bg-white'
        }`}
      />

      {/* Update button - appears when editing */}
      {isEditing && (
        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={handleUpdateNotes}
            disabled={isLoading}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Updating...' : 'Update Notes'}
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomerNotes;
