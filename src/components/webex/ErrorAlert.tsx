import React from 'react';
import Button from '../ui/Button';
import { useWorkflow } from '../../workflow/hooks/useWorkflow';
import { ErrorClossExtensionWorkflow } from '../../workflow/workflows/ErrorCloseExtensionWorkflow';


// Error Component to handle all Errors:
const ErrorAlert: React.FC = () => {
  const {error} = useWorkflow()

  const handleCloseApp = async () => {
    try {
      const errorCloseWorkflow = new ErrorClossExtensionWorkflow;
      await errorCloseWorkflow.execute();
    } catch {
      // HardClose WebExtension:
      pos_close();
    }
  };
   
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-red-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 border border-red-200">
        <div className="flex items-center mb-4">
          <div className="bg-red-100 rounded-full p-2 mr-3">
            <svg 
              className="w-6 h-6 text-red-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" 
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-red-800">Error Occurred</h2>
        </div>
        <div className="mb-6">
          <p className="text-center font-semibold text-gray-900">
            Error Message: {error}
          </p>
        </div>
        
        <div className="flex justify-center">
          <Button
            buttonText="Close Application"
            onButtonClick={handleCloseApp}
          />
        </div>
        <div className="text-center text-gray-500 text-sm m-4">
            <p>Please close the application and try again!</p>
            <p>If the error persists contact support <br/>and quote the error message!</p>
        </div>
      </div>     
    </div>
  );
};

export default ErrorAlert;
