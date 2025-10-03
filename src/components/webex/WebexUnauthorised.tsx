import React from "react";

const WebexUnauthorised: React.FC = () => {
  return (
    <div className="min-h-screen bg-red-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          401: Unauthorised Access
        </h2>
        <p className="text-gray-700">
          If this is an error, please contact support.
        </p>
      </div>
    </div>
  );
};

export default WebexUnauthorised;
